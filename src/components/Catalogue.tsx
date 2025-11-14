import { useFilms } from '@/hooks/useFilms';
import { Film } from '@/types/film';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { getFilmPosterPath, getPlaceholderImage } from '@/utils/imageHelpers';

const getFilmSlug = (film: Film): string => {
  const title = film.Film.Title_English || film.Film.Title_Original;
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export const Catalogue = () => {
  const { allFilms, loading, error } = useFilms();
  
  // Show top 6 films for preview on index page
  const topFilms = allFilms.slice(0, 6);
  return (
    <section id="catalogue" className="py-12 sm:py-16 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-center mb-4">Line Up Preview</h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>
        
        {loading && <p className="text-center">Loading films...</p>}
        {error && <p className="text-center text-destructive">Error: {error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topFilms.map((film, index) => {
            const f = film.Film;
            const crew = film.Crew;
            const title = f.Title_English || f.Title_Original || 'Untitled';
            const year = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
            const runtime = f.Runtime || '';
            const director = crew['Director(s)'] || 'Unknown Director';
            const slug = getFilmSlug(film);

            return (
              <Link 
                key={index}
                to={`/film/${slug}`}
                className="block group"
              >
                <div className="bg-card rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img 
                      src={getFilmPosterPath(film)} 
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = getPlaceholderImage();
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-2xl mb-1 group-hover:text-primary transition-colors">
                      {title}
                    </h3>
                    {f.Title_Original !== title && (
                      <p className="text-sm text-muted-foreground mb-2 italic">{f.Title_Original}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {f.Genre_List && f.Genre_List.length > 0 && f.Genre_List.map((genre, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{genre}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {runtime} • {year}
                    </p>
                    <p className="text-sm mb-2">by {director}</p>
                    <p className="text-sm text-foreground/80 line-clamp-3">
                      {film.Logline}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link 
            to="/catalogue" 
            className="inline-block px-8 py-3 bg-background border-2 border-foreground text-foreground font-semibold rounded hover:bg-foreground hover:text-background transition-all"
          >
            ALL FILMS
          </Link>
        </div>
      </div>
    </section>
  );
};
