import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFilms } from '@/hooks/useFilms';
import { Film } from '@/types/film';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getFilmPosterPath, getPlaceholderImage } from '@/utils/imageHelpers';

const getFilmSlug = (film: Film): string => {
  const title = film.Film.Title_English || film.Film.Title_Original;
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { allFilms, loading, error } = useFilms();
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    if (!loading && allFilms.length > 0 && slug) {
      const foundFilm = allFilms.find(f => getFilmSlug(f) === slug);
      setFilm(foundFilm || null);
    }
  }, [slug, allFilms, loading]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8">
          <p className="text-center">Loading film details...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8">
          <p className="text-center text-destructive">Error: {error}</p>
        </div>
      </>
    );
  }

  if (!film) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8">
          <div className="max-w-[1200px] mx-auto">
            <Link to="/catalogue">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Catalogue
              </Button>
            </Link>
            <p className="text-center">Film not found.</p>
          </div>
        </div>
      </>
    );
  }

  const f = film.Film;
  const crew = film.Crew;
  const title = f.Title_English || f.Title_Original || 'Untitled';
  const year = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <Link to="/catalogue">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Catalogue
            </Button>
          </Link>

          {/* Title section */}
          <div className="mb-8">
            <h1 className="text-5xl font-serif mb-2">{title}</h1>
            {f.Title_Original && f.Title_Original !== title && (
              <p className="text-xl italic text-muted-foreground mb-2">{f.Title_Original}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm">
              {year && <span className="font-bold">{year}</span>}
              {f.Runtime && <span className="font-bold">{f.Runtime}</span>}
              {f.Country_of_production && <span>{f.Country_of_production}</span>}
              {f.Language_Original && <span>Language: {f.Language_Original}</span>}
            </div>
          </div>

          <hr className="border-border mb-8" />

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-8">
            {/* Left column - Poster */}
            <div>
              <div className="aspect-[2/3] bg-muted rounded-lg overflow-hidden mb-4">
                <img 
                  src={getFilmPosterPath(film)} 
                  alt={`${title} poster`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = getPlaceholderImage();
                  }}
                />
              </div>
              {film.Trailer_url && (
                <Button asChild className="w-full">
                  <a href={film.Trailer_url} target="_blank" rel="noopener noreferrer">
                    Watch Trailer
                  </a>
                </Button>
              )}
            </div>

            {/* Right column - Info */}
            <div className="space-y-6">
              {/* Genres */}
              {f.Genre_List && f.Genre_List.length > 0 && (
                <div>
                  <h3 className="text-xl font-serif mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {f.Genre_List.map((g, i) => (
                      <Badge key={i} variant="secondary">{g}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Logline */}
              {film.Logline && (
                <div>
                  <h3 className="text-xl font-serif mb-2">Logline</h3>
                  <p className="text-foreground/90">{film.Logline}</p>
                </div>
              )}

              {/* Synopsis */}
              {film.Synopsis && (
                <div>
                  <h3 className="text-xl font-serif mb-2">Synopsis</h3>
                  <p className="text-foreground/90 text-justify">{film.Synopsis}</p>
                </div>
              )}

              {/* Director's Note */}
              {film.Directors_Note && (
                <div>
                  <h3 className="text-xl font-serif mb-2">Director's Note</h3>
                  <p className="text-foreground/90 text-justify">{film.Directors_Note}</p>
                </div>
              )}

              {/* Target Group */}
              {(f.Target_Group?.Rating || f.Target_Group?.Audience) && (
                <div>
                  <h3 className="text-xl font-serif mb-2">Target Group</h3>
                  <div className="space-y-1">
                    {f.Target_Group.Rating && <p><strong>Rating:</strong> {f.Target_Group.Rating}</p>}
                    {f.Target_Group.Audience && <p><strong>Audience:</strong> {f.Target_Group.Audience}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Crew section */}
          <div className="mb-8">
            <h2 className="text-3xl font-serif mb-4">Crew</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crew['Director(s)'] && (
                <div>
                  <strong>Director(s):</strong> {crew['Director(s)']}
                </div>
              )}
              {crew['Screenplay_writer(s)'] && (
                <div>
                  <strong>Screenplay:</strong> {crew['Screenplay_writer(s)']}
                </div>
              )}
              {crew['Director(s)_of_Photography'] && (
                <div>
                  <strong>Cinematography:</strong> {crew['Director(s)_of_Photography']}
                </div>
              )}
              {crew['Editor(s)'] && (
                <div>
                  <strong>Editor(s):</strong> {crew['Editor(s)']}
                </div>
              )}
              {crew['Sound_director(s)'] && (
                <div>
                  <strong>Sound:</strong> {crew['Sound_director(s)']}
                </div>
              )}
              {crew['Art_director(s)'] && (
                <div>
                  <strong>Art Director:</strong> {crew['Art_director(s)']}
                </div>
              )}
              {crew['Music_composer(s)'] && (
                <div>
                  <strong>Music:</strong> {crew['Music_composer(s)']}
                </div>
              )}
            </div>
          </div>

          {/* Cast */}
          {crew.Cast && crew.Cast.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-serif mb-3">Cast</h3>
              <ul className="list-disc list-inside space-y-1">
                {crew.Cast.map((actor: any, i: number) => (
                  <li key={i}>{typeof actor === 'string' ? actor : JSON.stringify(actor)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Festivals & Awards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {film.Festivals && film.Festivals.length > 0 && film.Festivals[0].Name_of_Festival && (
              <div>
                <h3 className="text-2xl font-serif mb-3">Festivals</h3>
                <ul className="space-y-2">
                  {film.Festivals.map((fest, i) => (
                    fest.Name_of_Festival && (
                      <li key={i}>
                        <strong>{fest.Name_of_Festival}</strong>
                        {fest.Country && <span> ({fest.Country})</span>}
                        {fest.Date && <span className="text-muted-foreground"> - {fest.Date}</span>}
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

            {film.Awards && film.Awards.length > 0 && film.Awards[0].Festival_Section_of_Competition && (
              <div>
                <h3 className="text-2xl font-serif mb-3">Awards</h3>
                <ul className="space-y-2">
                  {film.Awards.map((award, i) => (
                    award.Festival_Section_of_Competition && (
                      <li key={i}>
                        <strong>{award.Festival_Section_of_Competition}</strong>
                        {award.Country && <span> ({award.Country})</span>}
                        {award.Date && <span className="text-muted-foreground"> - {award.Date}</span>}
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Director Bio */}
          {film.Director_Bio?.Bio_Text && (
            <div className="mb-8">
              <h3 className="text-2xl font-serif mb-3">Director Biography</h3>
              <p className="text-foreground/90 text-justify">{film.Director_Bio.Bio_Text}</p>
            </div>
          )}

          {/* Director Filmography */}
          {film.Director_Filmography && film.Director_Filmography.length > 0 && (
            <div className="mb-8">
              <h3 className="text-2xl font-serif mb-3">Director's Filmography</h3>
              <ul className="list-disc list-inside space-y-1">
                {film.Director_Filmography.map((filmEntry: any, i: number) => (
                  <li key={i}>{typeof filmEntry === 'string' ? filmEntry : JSON.stringify(filmEntry)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
