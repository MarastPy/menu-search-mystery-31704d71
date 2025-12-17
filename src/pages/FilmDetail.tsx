import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFilms } from "@/hooks/useFilms";
import { Film } from "@/types/film";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
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

// Convert director name to author photo path
const getDirectorPhotoPath = (directorName: string): string => {
  if (!directorName) return "";
  // Convert name to folder format: remove accents, lowercase, replace spaces with underscores
  const normalized = directorName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special chars
    .trim()
    .replace(/\s+/g, "_"); // Replace spaces with underscores
  return `${import.meta.env.BASE_URL}images/authors/${normalized}.jpg`;
};

// Capitalize first letter only
const capitalizeFirst = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function FilmDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { allFilms, loading, error } = useFilms();
  const [film, setFilm] = useState<Film | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [validStills, setValidStills] = useState<string[]>([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [directorPhotoExists, setDirectorPhotoExists] = useState(false);
  const [directorPhotoPath, setDirectorPhotoPath] = useState("");

  useEffect(() => {
    if (!loading && allFilms.length > 0 && slug) {
      const foundFilm = allFilms.find((f) => getFilmSlug(f) === slug);
      setFilm(foundFilm || null);

      if (foundFilm) {
        const poster = getFilmPosterPath(foundFilm);
        // Check which stills actually exist (up to 20)
        const potentialStills = getFilmStillPaths(foundFilm, 20);

        // Validate each still by attempting to load it
        const checkStills = async () => {
          const validPaths: string[] = [];
          for (const stillPath of potentialStills) {
            const exists = await new Promise<boolean>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
              img.src = stillPath;
            });
            if (exists) {
              validPaths.push(stillPath);
            } else {
              // Stop checking once we find a missing image
              break;
            }
          }
          setValidStills(validPaths);
          setAllImages([poster, ...validPaths]);
        };

        checkStills();

        // Check director photo
        const directorName = foundFilm.Crew?.["Director(s)"];
        if (directorName) {
          const photoPath = getDirectorPhotoPath(directorName);
          setDirectorPhotoPath(photoPath);
          const img = new Image();
          img.onload = () => setDirectorPhotoExists(true);
          img.onerror = () => setDirectorPhotoExists(false);
          img.src = photoPath;
        }
      }
    }
  }, [slug, allFilms, loading]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8 bg-[#1c1c1c]">
          <p className="text-center text-white">Loading film details...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8 bg-[#1c1c1c]">
          <p className="text-center text-red-400">Error: {error}</p>
        </div>
      </>
    );
  }

  if (!film) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8 bg-[#1c1c1c]">
          <div className="max-w-[1200px] mx-auto">
            <p className="text-center text-white">Film not found.</p>
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
      <main className="min-h-screen pt-28 sm:pt-24 pb-8 sm:pb-16 font-nunito text-[17px] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          {/* Title section */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-garamond font-bold mb-4 text-white">{title}</h1>
            {f.Title_Original && (
              <div className="mb-4">
                <span className="text-lg text-white/70 uppercase tracking-wide font-light">ORIGINAL TITLE: </span>
                <span className="text-lg text-white font-bold">{capitalizeFirst(f.Title_Original)}</span>
              </div>
            )}
            <hr className="border-white/20 my-4" />
            <div className="flex flex-wrap gap-4 text-sm text-white">
              {year && <span className="font-bold">{year}</span>} |
              {f.Runtime && <span className="font-bold">{formatRuntime(film)}</span>} |
              {f.Country_of_production && <span className="font-light">{f.Country_of_production}</span>} |
              {f.Language_Original && <span className="font-light">Language: {f.Language_Original}</span>}
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 mb-8">
            {/* Left column - Poster and Stills */}
            <div>
              <div
                className="bg-muted rounded-lg overflow-hidden mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImageIndex(0)}
              >
                <img
                  src={getFilmPosterPath(film)}
                  alt={`${title} poster`}
                  className="w-full h-auto object-contain"
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
                      className="w-full h-full object-cover"
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

              {/* Stills Gallery - Show first 3 with clickable arrows */}
              {validStills.length > 0 && (
                <div className="relative">
                  <div
                    className={`grid gap-2 ${validStills.length === 1 ? "grid-cols-1 max-w-[200px] mx-auto" : validStills.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
                  >
                    {validStills.slice(0, 3).map((stillPath, idx) => (
                      <div
                        key={idx}
                        className="aspect-video bg-muted rounded overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                        onClick={() => setSelectedImageIndex(idx + 1)}
                      >
                        <img src={stillPath} alt={`${title} still ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  {validStills.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-black" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(validStills.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-white/80 transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-black" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Downloads section */}
              <div className="mt-6 space-y-2">
                {/*<h3 className="text-lg font-nunito font-bold mb-2 text-white">Downloads</h3> */}
                <Button asChild variant="dark" className="w-full">
                  <a href={getFilmPosterPath(film)} download={`${title.replace(/[^a-z0-9]/gi, "_")}_poster.jpg`}>
                    Poster
                  </a>
                </Button>
                {film.Download_stills && (
                  <Button asChild variant="dark" className="w-full">
                    <a href={film.Download_stills} target="_blank" rel="noopener noreferrer">
                      Stills
                    </a>
                  </Button>
                )}
                {film.Download_presskit && (
                  <Button asChild variant="dark" className="w-full">
                    <a href={film.Download_presskit} target="_blank" rel="noopener noreferrer">
                      Press Kit
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Right column - All text content */}
            <div className="space-y-8">
              {/* Review - Aligned to the right with a defined edge buffer */}
              {film.Review && (
                <div className="max-w-2xl ml-auto mr-4 md:mr-10 lg:mr-20 text-right py-6 mb-10">
                  <p className="text-3xl lg:text-4xl font-garamond italic text-white leading-tight">
                    "{film.Review}"
                  </p>
                  {film.Review_name && (
                    <p className="text-lg font-nunito text-white/60 mt-4 italic">
                      - {film.Review_name}
                    </p>
                  )}
                </div>
              )}

              {/* Info Grid - 3 columns, 2 rows */}
              {(film.Status ||
                f.Target_Group?.Rating ||
                f.Target_Group?.Audience ||
                f.Keywords ||
                film.Sales ||
                film.Festival_Distribution_Only === "yes") && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  {/* Row 1 */}
                  {film.Status && (
                    <div>
                      <h3 className="text-lg font-nunito font-bold mb-2 text-white">Status</h3>
                      <p className="text-white/90 font-light capitalize">{film.Status}</p>
                    </div>
                  )}

                  {(f.Target_Group?.Rating || f.Target_Group?.Audience) && (
                    <div>
                      <h3 className="text-lg font-nunito font-bold mb-2 text-white">Target group</h3>
                      <p className="text-white/90 font-light">
                        {f.Target_Group.Rating && <span>{f.Target_Group.Rating}</span>}
                        {f.Target_Group.Rating && f.Target_Group.Audience && <br />}
                        {f.Target_Group.Audience && <span>{f.Target_Group.Audience}</span>}
                      </p>
                    </div>
                  )}

                  {f.Keywords && (
                    <div>
                      <h3 className="text-lg font-nunito font-bold mb-2 text-white">Story topics</h3>
                      <p className="text-white/90 font-light">{f.Keywords}</p>
                    </div>
                  )}

                  {/* Row 2 */}
                  {film.Sales && (
                    <div>
                      <h3 className="text-lg font-nunito font-bold mb-2 text-white">Sales</h3>
                      <ul className="list-disc list-inside text-white/90 font-light">
                        <li>
                          <a
                            href={film.Sales.startsWith("http") ? film.Sales : `https://${film.Sales}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-white/80 transition-colors"
                          >
                            {film.Sales}
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}

                  {film.Festival_Distribution_Only === "yes" && (
                    <div>
                      <h3 className="text-lg font-nunito font-bold mb-2 text-white">Festival distribution only</h3>
                    </div>
                  )}
                </div>
              )}

              {/* Genres */}
              {f.Genre_List && f.Genre_List.length > 0 && (
                <div>
                  <h3 className="text-xl font-nunito font-bold mb-2 text-white">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {f.Genre_List.map((g, i) => (
                      <Badge key={i} variant="secondary" className="bg-white/10 text-white border-white/20">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Logline */}
              {film.Logline && (
                <div>
                  <h3 className="text-xl font-nunito font-bold mb-2 text-white">Logline</h3>
                  <p className="text-white/90 font-light">{film.Logline}</p>
                </div>
              )}

              {/* Synopsis */}
              {film.Synopsis && (
                <div>
                  <h3 className="text-xl font-nunito font-bold mb-2 text-white">Synopsis</h3>
                  <p className="text-white/90 text-justify font-light">{film.Synopsis}</p>
                </div>
              )}

              {/* Director's Note */}
              {film.Directors_Note && (
                <div>
                  <h3 className="text-xl font-nunito font-bold mb-2 text-white">Note</h3>
                  <p className="text-white/90 text-justify font-light">{film.Directors_Note}</p>
                </div>
              )}

              {/* Director Bio with Photo - moved here under Note */}
              {film.Director_Bio?.Bio_Text && (
                <div>
                  <h2 className="text-xl font-nunito font-bold mb-4 text-white">Director's Biography</h2>
                  <div className="flex flex-col sm:flex-row gap-6">
                    {directorPhotoExists && directorPhotoPath && (
                      <div className="flex-shrink-0">
                        <div className="w-[120px] h-[120px] rounded-full overflow-hidden ring-1 ring-white/20">
                          <img
                            src={directorPhotoPath}
                            alt={crew["Director(s)"] || "Director"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-grow">
                      <p className="text-white/90 text-justify font-light whitespace-pre-line">
                        {film.Director_Bio.Bio_Text}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Director's Filmography - Dynamic from data */}
              {film.Director_Filmography && film.Director_Filmography.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-xl font-nunito font-bold mb-4 text-white">Director's Filmography</h2>
                  <ul className="list-disc list-inside space-y-1 text-white/90 font-light">
                    {film.Director_Filmography.map((filmEntry: any, i: number) => (
                      <li key={i}>{typeof filmEntry === "string" ? filmEntry : JSON.stringify(filmEntry)}</li>
                    ))}
                  </ul>
                </div>
              )}

              <hr className="border-white/20" />

              {/* Two-column layout for Awards/Festivals and Crew/Cast/Tech */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left column - Awards & Festival Selections */}
                <div className="space-y-8">
                  {/* Awards */}
                  {film.Awards &&
                    film.Awards.length > 0 &&
                    film.Awards.some((a) => a.Festival_Section_of_Competition || a.Country || a.Date) && (
                      <div>
                        <h2 className="text-2xl font-nunito font-bold mb-4 text-white">Awards</h2>
                        <ul className="list-disc list-inside space-y-2 text-white/90 font-light">
                          {film.Awards.map(
                            (award, i) =>
                              (award.Festival_Section_of_Competition || award.Country || award.Date) && (
                                <li key={i}>
                                  {award.Festival_Section_of_Competition && (
                                    <span className="font-bold">{award.Festival_Section_of_Competition}</span>
                                  )}
                                  {award.Country && <span> ({award.Country})</span>}
                                  {award.Date && <span className="text-white/60"> - {award.Date}</span>}
                                </li>
                              ),
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Festival Selections */}
                  {film.Festivals && film.Festivals.length > 0 && film.Festivals[0].Name_of_Festival && (
                    <div>
                      <h2 className="text-2xl font-nunito font-bold mb-4 text-white">Festival Selections</h2>
                      <ul className="list-disc list-inside space-y-2 text-white/90 font-light">
                        {film.Festivals.map(
                          (fest, i) =>
                            fest.Name_of_Festival && (
                              <li key={i}>
                                <span className="font-bold">{fest.Name_of_Festival}</span>
                                {fest.Country && <span> ({fest.Country})</span>}
                                {fest.Date && <span className="text-white/60"> - {fest.Date}</span>}
                              </li>
                            ),
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right column - Crew, Cast, Tech Specs */}
                <div className="space-y-8">
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
                      <h2 className="text-2xl font-nunito font-bold mb-4 text-white">Crew</h2>
                      <div className="space-y-2 text-white">
                        {crew["Director(s)"] && (
                          <div>
                            <span className="font-bold">Director:</span>{" "}
                            <span className="font-light">{crew["Director(s)"]}</span>
                          </div>
                        )}
                        {crew["Screenplay_writer(s)"] && (
                          <div>
                            <span className="font-bold">Writer:</span>{" "}
                            <span className="font-light">{crew["Screenplay_writer(s)"]}</span>
                          </div>
                        )}
                        {crew["Director(s)_of_Photography"] && (
                          <div>
                            <span className="font-bold">Cinematographer:</span>{" "}
                            <span className="font-light">{crew["Director(s)_of_Photography"]}</span>
                          </div>
                        )}
                        {crew["Editor(s)"] && (
                          <div>
                            <span className="font-bold">Editor:</span>{" "}
                            <span className="font-light">{crew["Editor(s)"]}</span>
                          </div>
                        )}
                        {crew["Music_composer(s)"] && (
                          <div>
                            <span className="font-bold">Music Composer:</span>{" "}
                            <span className="font-light">{crew["Music_composer(s)"]}</span>
                          </div>
                        )}
                        {crew["Sound_director(s)"] && (
                          <div>
                            <span className="font-bold">Sound Director:</span>{" "}
                            <span className="font-light">{crew["Sound_director(s)"]}</span>
                          </div>
                        )}
                        {crew["Art_director(s)"] && (
                          <div>
                            <span className="font-bold">Art Director:</span>{" "}
                            <span className="font-light">{crew["Art_director(s)"]}</span>
                          </div>
                        )}
                        {film.Producer_Representative && (
                          <div>
                            <span className="font-bold">Producer:</span>{" "}
                            <span className="font-light">
                              {typeof film.Producer_Representative === "string"
                                ? film.Producer_Representative
                                : JSON.stringify(film.Producer_Representative)}
                            </span>
                          </div>
                        )}
                        {film.Production_Company && (
                          <div>
                            <span className="font-bold">Company:</span>{" "}
                            <span className="font-light">
                              {typeof film.Production_Company === "string"
                                ? film.Production_Company
                                : JSON.stringify(film.Production_Company)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cast */}
                  {crew.Cast && crew.Cast.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-nunito font-bold mb-4 text-white">Cast</h2>
                      <ul className="list-disc list-inside space-y-1 text-white/90 font-light">
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
                      <h2 className="text-2xl font-nunito font-bold mb-4 text-white">Tech Specs</h2>
                      <div className="space-y-2 text-white">
                        {f.Runtime && (
                          <div>
                            <span className="font-bold">Runtime:</span>{" "}
                            <span className="font-light">{formatRuntime(film)}</span>
                          </div>
                        )}
                        {film.Technical_Details?.Sound_mix && (
                          <div>
                            <span className="font-bold">Sound Mix:</span>{" "}
                            <span className="font-light">{film.Technical_Details.Sound_mix}</span>
                          </div>
                        )}
                        {film.Technical_Details?.Aspect_ratio && (
                          <div>
                            <span className="font-bold">Aspect Ratio:</span>{" "}
                            <span className="font-light">{film.Technical_Details.Aspect_ratio}</span>
                          </div>
                        )}
                        {film.Technical_Details?.Color && (
                          <div>
                            <span className="font-bold">Color:</span>{" "}
                            <span className="font-light">{film.Technical_Details.Color}</span>
                          </div>
                        )}
                        {f.Date_of_completion && (
                          <div>
                            <span className="font-bold">Release Date:</span>{" "}
                            <span className="font-light">{f.Date_of_completion}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>


              {/* Festival Distribution, Sales - Conditional Display */}
              <div className="space-y-4">
                {/* Festival Distribution Only - Show only if "Yes" */}
                {film.Festival_Distribution_Only && film.Festival_Distribution_Only.toLowerCase() === "yes" && (
                  <div>
                    <h3 className="text-lg font-nunito font-bold mb-2 text-white">Festival Distribution Only</h3>
                    <p className="text-white/90 font-light">Yes</p>
                  </div>
                )}

                {/* Sales - Show as link if filled */}
                {film.Sales && film.Sales.trim() !== "" && (
                  <div>
                    <h3 className="text-lg font-nunito font-bold mb-2 text-white">Sales</h3>
                    {film.Sales.startsWith("http") ? (
                      <a
                        href={film.Sales}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/90 font-light underline hover:text-white transition-colors"
                      >
                        {film.Sales}
                      </a>
                    ) : (
                      <p className="text-white/90 font-light">{film.Sales}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Gallery Dialog */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0" closeAbove>
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
      <Footer />
    </>
  );
}
