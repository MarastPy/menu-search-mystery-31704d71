import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFilms } from "@/hooks/useFilms";
import { Film } from "@/types/film";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  return isNaN(totalMinutes) ? null : Math.round(totalMinutes);
};

const formatRuntime = (film: Film): string => {
  const f = film.Film;
  const numSeries = parseInt(f.Number_of_series || "0");
  const numEpisodes = parseInt(f.Number_of_episodes || "0");

  if (numSeries > 0 && numEpisodes > 0) {
    const episodeRuntime = parseRuntimeToMinutes(f.Runtime);
    if (episodeRuntime) return `${numSeries * numEpisodes} × ${episodeRuntime} min`;
  }
  const minutes = parseRuntimeToMinutes(f.Runtime);
  return minutes ? `${minutes} min` : f.Runtime || "";
};

const getDirectorPhotoPath = (directorName: string): string => {
  if (!directorName) return "";
  const normalized = directorName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  return `${import.meta.env.BASE_URL}images/authors/${normalized}.jpg`;
};

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
        const potentialStills = getFilmStillPaths(foundFilm, 20);

        const checkStills = async () => {
          const validPaths: string[] = [];
          for (const stillPath of potentialStills) {
            const exists = await new Promise<boolean>((resolve) => {
              const img = new Image();
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
              img.src = stillPath;
            });
            if (exists) validPaths.push(stillPath);
            else break;
          }
          setValidStills(validPaths);
          setAllImages([poster, ...validPaths]);
        };

        checkStills();

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

  if (loading)
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 bg-[#1c1c1c] text-center text-white">Loading...</div>
      </>
    );
  if (error || !film)
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 bg-[#1c1c1c] text-center text-white">{error || "Film not found."}</div>
      </>
    );

  const f = film.Film;
  const crew = film.Crew;
  const title = f.Title_English || f.Title_Original || "Untitled";
  const year = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || "";

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-24 pb-16 font-nunito text-[17px] text-white bg-[#1c1c1c]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-6xl font-garamond font-bold mb-4">{title}</h1>
            {f.Title_Original && (
              <div className="mb-4">
                <span className="text-white/60 uppercase text-sm tracking-widest">Original Title: </span>
                <span className="font-bold">{capitalizeFirst(f.Title_Original)}</span>
              </div>
            )}
            <hr className="border-white/10 my-6" />
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              {year && <span className="font-bold">{year}</span>}
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>{formatRuntime(film)}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>{f.Country_of_production}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>{f.Language_Original}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12">
            {/* LEFT COLUMN: Visuals & Downloads */}
            <aside className="space-y-6">
              <div
                className="rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-all shadow-2xl"
                onClick={() => setSelectedImageIndex(0)}
              >
                <img
                  src={getFilmPosterPath(film)}
                  alt={title}
                  className="w-full h-auto"
                  onError={(e) => (e.currentTarget.src = getPlaceholderImage())}
                />
              </div>

              {film.Trailer_url && (
                <div
                  className="relative group cursor-pointer rounded-lg overflow-hidden aspect-video bg-black/40"
                  onClick={() => setIsTrailerOpen(true)}
                >
                  <img
                    src={
                      film.Trailer_url.includes("youtube")
                        ? `https://img.youtube.com/vi/${film.Trailer_url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)?.[1]}/hqdefault.jpg`
                        : getPlaceholderImage()
                    }
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <div className="border-y-[8px] border-y-transparent border-l-[14px] border-l-black ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {validStills.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {validStills.slice(0, 3).map((path, i) => (
                    <div
                      key={i}
                      className="aspect-video rounded overflow-hidden cursor-pointer hover:brightness-125"
                      onClick={() => setSelectedImageIndex(i + 1)}
                    >
                      <img src={path} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 space-y-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white hover:text-black"
                >
                  <a href={getFilmPosterPath(film)} download>
                    Download Poster
                  </a>
                </Button>
                {film.Download_presskit && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white hover:text-black"
                  >
                    <a href={film.Download_presskit} target="_blank">
                      Press Kit (PDF)
                    </a>
                  </Button>
                )}
              </div>
            </aside>

            {/* RIGHT COLUMN: Text Content */}
            <div className="flex flex-col space-y-12">
              {/* 1. REVIEW QUOTE - Centered Hero element */}
              {film.Review && (
                <div className="text-center py-4 border-y border-white/5">
                  <blockquote className="text-3xl lg:text-4xl font-garamond italic leading-tight text-white mb-6">
                    “{film.Review}”
                  </blockquote>
                  {film.Review_name && (
                    <cite className="text-white/50 font-nunito not-italic text-lg">— {film.Review_name}</cite>
                  )}
                </div>
              )}

              {/* 2. CORE INFO GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {film.Status && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">Status</h4>
                    <p className="font-light">• {film.Status}</p>
                  </div>
                )}
                {(f.Target_Group?.Rating || f.Target_Group?.Audience) && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">Target Group</h4>
                    <p className="font-light">
                      {f.Target_Group.Rating && <span>{f.Target_Group.Rating}</span>}
                      {f.Target_Group.Audience && (
                        <>
                          <br />
                          <span>{f.Target_Group.Audience}</span>
                        </>
                      )}
                    </p>
                  </div>
                )}
                {f.Keywords && (
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-bold">Story Topics</h4>
                    <p className="font-light">{f.Keywords}</p>
                  </div>
                )}
              </div>

              {/* 3. LOGLINE - Left aligned */}
              {film.Logline && (
                <section>
                  <h3 className="text-xl font-bold mb-3">Logline</h3>
                  <p className="text-white/80 font-light leading-relaxed text-lg italic">{film.Logline}</p>
                </section>
              )}

              {/* 4. SYNOPSIS - Left aligned */}
              {film.Synopsis && (
                <section>
                  <h3 className="text-xl font-bold mb-3">Synopsis</h3>
                  <p className="text-white/80 font-light leading-relaxed text-justify">{film.Synopsis}</p>
                </section>
              )}

              {/* 5. DIRECTOR'S NOTE */}
              {film.Directors_Note && (
                <section className="bg-white/5 p-8 rounded-lg border-l-2 border-white/20">
                  <h3 className="text-xl font-bold mb-4">Director's Note</h3>
                  <p className="text-white/80 font-light leading-relaxed text-justify italic">{film.Directors_Note}</p>
                </section>
              )}

              {/* 6. DIRECTOR BIO */}
              {film.Director_Bio?.Bio_Text && (
                <section>
                  <h3 className="text-xl font-bold mb-6">Director's Biography</h3>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    {directorPhotoExists && (
                      <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 grayscale hover:grayscale-0 transition-all border border-white/10">
                        <img src={directorPhotoPath} alt="Director" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <p className="text-white/70 font-light leading-relaxed whitespace-pre-line text-justify">
                      {film.Director_Bio.Bio_Text}
                    </p>
                  </div>
                </section>
              )}

              <hr className="border-white/10" />

              {/* 7. CREDITS & SPECS (Two Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Awards & Festivals */}
                <div className="space-y-10">
                  {film.Awards?.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Awards</h3>
                      <ul className="space-y-3 text-sm font-light">
                        {film.Awards.map((a, i) => (
                          <li key={i}>
                            <span className="font-bold text-white">{a.Festival_Section_of_Competition}</span>
                            {a.Country && <span className="text-white/60"> ({a.Country})</span>}
                            {a.Date && <span className="block text-xs text-white/40 mt-0.5">{a.Date}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Tech & Production Crew */}
                <div className="space-y-4 text-sm">
                  <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Crew</h3>
                  {[
                    { label: "Director", val: crew["Director(s)"] },
                    { label: "Writer", val: crew["Screenplay_writer(s)"] },
                    { label: "Cinematography", val: crew["Director(s)_of_Photography"] },
                    { label: "Editing", val: crew["Editor(s)"] },
                    { label: "Music", val: crew["Music_composer(s)"] },
                    { label: "Producer", val: film.Producer_Representative },
                    { label: "Production Co", val: film.Production_Company },
                  ].map(
                    (item, i) =>
                      item.val && (
                        <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                          <span className="text-white/40 font-bold">{item.label}</span>
                          <span className="text-right font-light">{item.val}</span>
                        </div>
                      ),
                  )}

                  <h3 className="text-lg font-bold mt-8 mb-4 border-b border-white/10 pb-2">Technical Specs</h3>
                  <div className="grid grid-cols-2 gap-y-2 opacity-80 font-light">
                    <div>Runtime: {formatRuntime(film)}</div>
                    <div>Aspect: {film.Technical_Details?.Aspect_ratio}</div>
                    <div>Color: {film.Technical_Details?.Color}</div>
                    <div>Sound: {film.Technical_Details?.Sound_mix}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Image Modal */}
      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-[95vw] h-[90vh] p-0 bg-black border-none">
          {selectedImageIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={allImages[selectedImageIndex]} className="max-w-full max-h-full object-contain" />
              <button
                onClick={() => setSelectedImageIndex((i) => (i === 0 ? allImages.length - 1 : i - 1))}
                className="absolute left-4 text-white hover:scale-125 transition-transform"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={() => setSelectedImageIndex((i) => (i + 1) % allImages.length)}
                className="absolute right-4 text-white hover:scale-125 transition-transform"
              >
                <ChevronRight size={48} />
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Footer />
    </>
  );
}
