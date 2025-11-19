import { useFilms } from '@/hooks/useFilms';
import { Film } from '@/types/film';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getFilmPosterPath, getPlaceholderImage } from '@/utils/imageHelpers';

const parseRuntimeToMinutes = (runtimeString: string): number | null => {
  if (!runtimeString) return null;
  
  const cleanStr = runtimeString.trim().toLowerCase().replace(/[^0-9:]/g, '');
  let totalMinutes = 0;
  const parts = cleanStr.split(':').map((p) => parseFloat(p));

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    totalMinutes = (hours || 0) * 60 + (minutes || 0) + (seconds || 0) / 60;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    totalMinutes = (minutes || 0) + (seconds || 0) / 60;
  } else if (parts.length === 1 && cleanStr !== '') {
    totalMinutes = parts[0];
  } else {
    return null;
  }

  if (isNaN(totalMinutes)) return null;
  return Math.round(totalMinutes);
};

const getFilmSlug = (film: Film): string => {
  const title = film.Film.Title_English || film.Film.Title_Original;
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export const Catalogue = () => {
  const { allFilms, loading, error } = useFilms();
  
  // Show top 3 films for preview on index page
  const topFilms = allFilms.slice(0, 3);
  return (
    <section id="catalogue" className="py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-serif text-foreground text-[2em] sm:text-[2.5em] lg:text-[3em] mb-4 text-left">Line Up Preview</h1>
        <div className="w-40 h-1 bg-border mb-12"></div>
        
        {loading && <p className="text-center">Loading films...</p>}
        {error && <p className="text-center text-destructive">Error: {error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topFilms.map((film, index) => {
            const f = film.Film;
            const crew = film.Crew;
            const title = f.Title_English || f.Title_Original || 'Untitled';
            const year = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
            const exactMinutes = parseRuntimeToMinutes(f.Runtime);
            const director = crew['Director(s)'] || 'Unknown Director';
            const slug = getFilmSlug(film);

            return (
              <Link 
                key={index}
                to={`/film/${slug}`}
                className="block group h-full"
              >
                <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 h-full flex flex-col">
                  <div className="aspect-video bg-muted relative overflow-hidden flex-shrink-0">
                    <img 
                      src={getFilmPosterPath(film)} 
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = getPlaceholderImage();
                      }}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-serif text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {f.Title_Original || title} {exactMinutes && `| ${exactMinutes}min`} {year && `| ${year}`}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2 min-h-[1.75rem]">
                      {f.Genre_List && f.Genre_List.length > 0 && f.Genre_List.map((genre, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{genre}</Badge>
                      ))}
                    </div>
                    <p className="text-sm mb-2">by {director}</p>
                          <p className="text-sm text-foreground/80 line-clamp-3 mb-2 flex-grow min-h-[3.6rem]">
                            {film.Logline}
                          </p>
                    
                    {/* Festival Information */}
                    <div className="mt-auto pt-4 border-t border-border/50 min-h-[5rem]">
                      {film.Festivals && film.Festivals.length > 0 && (
                        <>
                          <p className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">Featured at:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {film.Festivals.slice(0, 3).map((festival, idx) => (
                              <Badge key={idx} variant="outline" className="text-[0.7rem] py-0.5 px-2 bg-primary/5 border-primary/30">
                                {festival.Name_of_Festival}
                              </Badge>
                            ))}
                            {film.Festivals.length > 3 && (
                              <Badge variant="outline" className="text-[0.7rem] py-0.5 px-2 bg-muted">
                                +{film.Festivals.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="dark" size="lg" className="text-base font-bold">
            <Link to="/catalogue">
              ALL FILMS
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
