import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFilms } from "@/hooks/useFilms";
import { Film } from "@/types/film";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { getFilmPosterPath, getFilmStillPaths, getPlaceholderImage } from "@/utils/imageHelpers";

const getFilmSlug = (film: Film): string => {
  const title = film.Film.Title_English || film.Film.Title_Original;
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

const parseRuntimeToMinutes = (runtimeString: string): number | null => {
  if (!runtimeString) return null;

  const cleanStr = runtimeString
    .trim()
    .toLowerCase()
    .replace(/[^0-9:]/g, "");
  let totalMinutes = 0;
  const parts = cleanStr.split(":").map((p) => parseFloat(p));

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    totalMinutes = (hours || 0) * 60 + (minutes || 0) + (seconds || 0) / 60;
  } else if (parts.length === 2) {
    const [minutes, seconds] = parts;
    totalMinutes = (minutes || 0) + (seconds || 0) / 60;
  } else if (parts.length === 1 && cleanStr !== "") {
    totalMinutes = parts[0];
  } else {
    return null;
  }

  if (isNaN(totalMinutes)) return null;
  return Math.round(totalMinutes);
};

const formatRuntime = (film: Film): string => {
  const f = film.Film;

  // Check if it's a series
  const numSeries = parseInt(f.Number_of_series || "0");
  const numEpisodes = parseInt(f.Number_of_episodes || "0");

  if (numSeries > 0 && numEpisodes > 0) {
    const episodeRuntime = parseRuntimeToMinutes(f.Runtime);
    if (episodeRuntime) {
      return `${numSeries * numEpisodes} × ${episodeRuntime} min`;
    }
  }

  // Regular film
  const minutes = parseRuntimeToMinutes(f.Runtime);
  return minutes ? `${minutes} min` : f.Runtime || "";
};

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { allFilms, loading, error } = useFilms();
  const [film, setFilm] = useState<Film | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    if (!loading && allFilms.length > 0 && slug) {
      const foundFilm = allFilms.find((f) => getFilmSlug(f) === slug);
      setFilm(foundFilm || null);

      if (foundFilm) {
        const poster = getFilmPosterPath(foundFilm);
        const stills = getFilmStillPaths(foundFilm);
        setAllImages([poster, ...stills]);
      }
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
  const title = f.Title_English || f.Title_Original || "Untitled";
  const year = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || "";

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 sm:pt-24 pb-8 sm:pb-16 font-nunito text-[17px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <Link to="/catalogue">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Catalogue
            </Button>
          </Link>

          {/* Title section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-nunito mb-2">{title}</h1>
            {f.Title_Original && f.Title_Original !== title && (
              <p className="text-xl text-white mb-2">Original title: {f.Title_Original}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm">
              {year && <span className="font-bold">{year}</span>} |
              {f.Runtime && <span className="font-bold">{formatRuntime(film)}</span>} |
              {f.Country_of_production && <span>{f.Country_of_production}</span>} |
              {f.Language_Original && <span>Language: {f.Language_Original}</span>}
            </div>
          </div>

          <hr className="border-border mb-8" />

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-8">
            {/* Left column - Poster and Stills */}
            <div>
              <div
                className="aspect-[2/3] bg-muted rounded-lg overflow-hidden mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImageIndex(0)}
              >
                <img
                  src={getFilmPosterPath(film)}
                  alt={`${title} poster`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = getPlaceholderImage();
                  }}
                />
              </div>

              {/* Video Preview Thumbnail */}
              {film.Trailer_url && (
                <div
                  className="mt-4 mb-4 relative cursor-pointer group overflow-hidden rounded-lg"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  <div className="aspect-video bg-muted">
                    <img
                      src={(() => {
                        const url = film.Trailer_url;
                        // Extract YouTube video ID
                        const youtubeMatch = url.match(
                          /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
                        );
                        if (youtubeMatch) {
                          return `https://img.youtube.com/vi/${youtubeMatch[1]}/hqdefault.jpg`;
                        }
                        // Extract Vimeo video ID
                        const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                        if (vimeoMatch) {
                          return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
                        }
                        return getPlaceholderImage();
                      })()}
                      alt="Trailer preview"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = getPlaceholderImage();
                      }}
                    />
                  </div>
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Stills Gallery - Show only first 3, rest available in popup */}
              {getFilmStillPaths(film).length > 0 && (
                <div>
                  {/*<h3 className="text-lg font-nunito mb-3">Film Stills</h3>*/}
                  <div className="grid grid-cols-3 gap-2">
                    {getFilmStillPaths(film).slice(0, 3).map((stillPath, idx) => (
                      <div
                        key={idx}
                        className="aspect-video bg-muted rounded overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => setSelectedImageIndex(idx + 1)}
                      >
                        <img
                          src={stillPath}
                          alt={`${title} still ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = getPlaceholderImage();
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downloads section */}
              <div className="mt-4 space-y-2">
                <h3 className="text-lg font-nunito mb-2">Downloads</h3>
                <Button asChild variant="outline" className="w-full">
                  <a href={getFilmPosterPath(film)} download={`${title.replace(/[^a-z0-9]/gi, "_")}_poster.jpg`}>
                    Poster
                  </a>
                </Button>
                {film.Download_stills && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={film.Download_stills} target="_blank" rel="noopener noreferrer">
                      Stills
                    </a>
                  </Button>
                )}
                {film.Download_presskit && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={film.Download_presskit} target="_blank" rel="noopener noreferrer">
                      Press Kit
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Right column - All text content */}
            <div className="space-y-8">
              {/* Genres */}
              {f.Genre_List && f.Genre_List.length > 0 && (
                <div>
                  <h3 className="text-xl font-nunito mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {f.Genre_List.map((g, i) => (
                      <Badge key={i} variant="secondary">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Logline */}
              {film.Logline && (
                <div>
                  <h3 className="text-xl font-nunito mb-2">Logline</h3>
                  <p className="text-foreground/90">{film.Logline}</p>
                </div>
              )}

              {/* Synopsis */}
              {film.Synopsis && (
                <div>
                  <h3 className="text-xl font-nunito mb-2">Synopsis</h3>
                  <p className="text-foreground/90 text-justify">{film.Synopsis}</p>
                </div>
              )}

              {/* Director's Note */}
              {film.Directors_Note && (
                <div>
                  <h3 className="text-xl font-nunito mb-2">Director's Note</h3>
                  <p className="text-foreground/90 text-justify">{film.Directors_Note}</p>
                </div>
              )}

              {/* Target Group */}
              {(f.Target_Group?.Rating || f.Target_Group?.Audience) && (
                <div>
                  <h3 className="text-xl font-nunito mb-2">Target Group</h3>
                  <div className="space-y-1">
                    {f.Target_Group.Rating && (
                      <p>
                        <span className="font-semibold">Rating:</span> {f.Target_Group.Rating}
                      </p>
                    )}
                    {f.Target_Group.Audience && (
                      <p>
                        <span className="font-semibold">Audience:</span> {f.Target_Group.Audience}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Story Topics */}
              {f.Keywords && (
                <div>
                  <h3 className="text-xl font-nunito mb-2">Story Topics</h3>
                  <p className="text-foreground/90">{f.Keywords}</p>
                </div>
              )}

              <hr className="border-border" />

              {/* Crew section */}
              {(crew["Director(s)"] ||
                crew["Screenplay_writer(s)"] ||
                crew["Director(s)_of_Photography"] ||
                crew["Editor(s)"] ||
                crew["Music_composer(s)"] ||
                crew["Sound_director(s)"] ||
                crew["Art_director(s)"] ||
                film.Producer_Representative ||
                film.Production_Company) && (
                <div>
                  <h2 className="text-2xl font-nunito mb-4">Crew</h2>
                  <div className="space-y-2">
                    {crew["Director(s)"] && (
                      <div>
                        <span className="font-semibold">Director:</span> {crew["Director(s)"]}
                      </div>
                    )}
                    {crew["Screenplay_writer(s)"] && (
                      <div>
                        <span className="font-semibold">Writer:</span> {crew["Screenplay_writer(s)"]}
                      </div>
                    )}
                    {crew["Director(s)_of_Photography"] && (
                      <div>
                        <span className="font-semibold">Cinematographer:</span> {crew["Director(s)_of_Photography"]}
                      </div>
                    )}
                    {crew["Editor(s)"] && (
                      <div>
                        <span className="font-semibold">Editor:</span> {crew["Editor(s)"]}
                      </div>
                    )}
                    {crew["Music_composer(s)"] && (
                      <div>
                        <span className="font-semibold">Music Composer:</span> {crew["Music_composer(s)"]}
                      </div>
                    )}
                    {crew["Sound_director(s)"] && (
                      <div>
                        <span className="font-semibold">Sound Director:</span> {crew["Sound_director(s)"]}
                      </div>
                    )}
                    {crew["Art_director(s)"] && (
                      <div>
                        <span className="font-semibold">Art Director:</span> {crew["Art_director(s)"]}
                      </div>
                    )}
                    {film.Producer_Representative && (
                      <div>
                        <span className="font-semibold">Producer:</span>{" "}
                        {typeof film.Producer_Representative === "string"
                          ? film.Producer_Representative
                          : JSON.stringify(film.Producer_Representative)}
                      </div>
                    )}
                    {film.Production_Company && (
                      <div>
                        <span className="font-semibold">Company:</span>{" "}
                        {typeof film.Production_Company === "string"
                          ? film.Production_Company
                          : JSON.stringify(film.Production_Company)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Cast */}
              {crew.Cast && crew.Cast.length > 0 && (
                <div>
                  <h2 className="text-2xl font-nunito mb-4">Cast</h2>
                  <ul className="list-disc list-inside space-y-1 text-foreground/90">
                    {crew.Cast.map((actor: any, i: number) => (
                      <li key={i}>{typeof actor === "string" ? actor : JSON.stringify(actor)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Specs */}
              {(f.Runtime ||
                film.Technical_Details?.Sound_mix ||
                film.Technical_Details?.Aspect_ratio ||
                film.Technical_Details?.Color ||
                f.Date_of_completion) && (
                <div>
                  <h2 className="text-2xl font-nunito mb-4">Tech Specs</h2>
                  <div className="space-y-2">
                    {f.Runtime && (
                      <div>
                        <span className="font-semibold">Runtime:</span> {formatRuntime(film)}
                      </div>
                    )}
                    {film.Technical_Details?.Sound_mix && (
                      <div>
                        <span className="font-semibold">Sound Mix:</span> {film.Technical_Details.Sound_mix}
                      </div>
                    )}
                    {film.Technical_Details?.Aspect_ratio && (
                      <div>
                        <span className="font-semibold">Aspect Ratio:</span> {film.Technical_Details.Aspect_ratio}
                      </div>
                    )}
                    {film.Technical_Details?.Color && (
                      <div>
                        <span className="font-semibold">Color:</span> {film.Technical_Details.Color}
                      </div>
                    )}
                    {f.Date_of_completion && (
                      <div>
                        <span className="font-semibold">Date Release:</span> {f.Date_of_completion}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Awards */}
              {film.Awards && film.Awards.length > 0 && film.Awards[0].Festival_Section_of_Competition && (
                <div>
                  <h2 className="text-2xl font-nunito mb-4">Awards</h2>
                  <ul className="space-y-2 text-foreground/90">
                    {film.Awards.map(
                      (award, i) =>
                        award.Festival_Section_of_Competition && (
                          <li key={i}>
                            <strong>{award.Festival_Section_of_Competition}</strong>
                            {award.Country && <span> ({award.Country})</span>}
                            {award.Date && <span className="text-muted-foreground"> - {award.Date}</span>}
                          </li>
                        ),
                    )}
                  </ul>
                </div>
              )}

              {/* Festivals */}
              {film.Festivals && film.Festivals.length > 0 && film.Festivals[0].Name_of_Festival && (
                <div>
                  <h2 className="text-2xl font-nunito mb-4">Festivals</h2>
                  <ul className="space-y-2 text-foreground/90">
                    {film.Festivals.map(
                      (fest, i) =>
                        fest.Name_of_Festival && (
                          <li key={i}>
                            <strong>{fest.Name_of_Festival}</strong>
                            {fest.Country && <span> ({fest.Country})</span>}
                            {fest.Date && <span className="text-muted-foreground"> - {fest.Date}</span>}
                          </li>
                        ),
                    )}
                  </ul>
                </div>
              )}

              {/* Director Bio */}
              {film.Director_Bio?.Bio_Text && (
                <div>
                  <h2 className="text-2xl font-nunito mb-4">Director Biography</h2>
                  <p className="text-foreground/90 text-justify">{film.Director_Bio.Bio_Text}</p>
                </div>
              )}

              {/* Director Filmography */}
              {film.Director_Filmography && film.Director_Filmography.length > 0 && (
                <div>
                  <h2 className="text-2xl font-nunito mb-4">Director's Filmography</h2>
                  <ul className="list-disc list-inside space-y-1 text-foreground/90">
                    {film.Director_Filmography.map((filmEntry: any, i: number) => (
                      <li key={i}>{typeof filmEntry === "string" ? filmEntry : JSON.stringify(filmEntry)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Additional Metadata */}
              {(film.Festival_Distribution_Only || film.Sales || film.Status) && (
                <div className="space-y-4">
                  {film.Festival_Distribution_Only && (
                    <div>
                      <h3 className="text-lg font-nunito mb-2">Festival Distribution Only</h3>
                      <p className="text-foreground/90">{film.Festival_Distribution_Only}</p>
                    </div>
                  )}
                  {film.Sales && (
                    <div>
                      <h3 className="text-lg font-nunito mb-2">Sales</h3>
                      <p className="text-foreground/90">{film.Sales}</p>
                    </div>
                  )}
                  {film.Status && (
                    <div>
                      <h3 className="text-lg font-nunito mb-2">Status</h3>
                      <p className="text-foreground/90">{film.Status}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Image Gallery Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0">
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            {selectedImageIndex !== null && allImages[selectedImageIndex] && (
              <>
                <img
                  src={allImages[selectedImageIndex]}
                  alt={`${title} - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain"
                />

                {/* Navigation buttons */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === null ? null : prev === 0 ? allImages.length - 1 : prev - 1,
                        );
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === null ? null : prev === allImages.length - 1 ? 0 : prev + 1,
                        );
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                      {selectedImageIndex + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Trailer Dialog */}
      {film?.Trailer_url && (
        <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
          <DialogContent className="max-w-4xl p-0">
            <div className="aspect-video w-full bg-black">
              <iframe
                src={film.Trailer_url.replace("vimeo.com/", "player.vimeo.com/video/")}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Film Trailer"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
