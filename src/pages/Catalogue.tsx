import { useState, useMemo } from "react";
import { useFilms } from "@/hooks/useFilms";
import { Film } from "@/types/film";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { getFilmStillPaths, getPlaceholderImage } from "@/utils/imageHelpers";
import { ChevronDown, X } from "lucide-react";

const getRoundedRuntime = (runtimeString: string): string | null => {
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
  totalMinutes = Math.round(totalMinutes);

  if (totalMinutes < 40) return "short";
  if (totalMinutes <= 70) return "mid-length";
  return "full-length";
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

const getFilmSlug = (film: Film): string => {
  const title = film.Film.Title_English || film.Film.Title_Original;
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

// Multi-select filter component
const MultiSelectFilter = ({
  label,
  options,
  selectedValues,
  onChange,
  availableOptions,
  formatOption,
}: {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  availableOptions: Set<string>;
  formatOption?: (value: string) => string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full sm:w-[180px] justify-between bg-card border-border text-left font-normal"
        >
          <span className="truncate">
            {selectedValues.length === 0
              ? `All ${label}`
              : selectedValues.length === 1
                ? formatOption
                  ? formatOption(selectedValues[0])
                  : selectedValues[0]
                : `${selectedValues.length} selected`}
          </span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0 bg-card border-border z-50" align="start">
        <div className="max-h-[300px] overflow-auto p-2">
          {selectedValues.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="w-full justify-start text-xs mb-2 text-muted-foreground hover:text-foreground"
            >
              <X className="mr-2 h-3 w-3" />
              Clear selection
            </Button>
          )}
          {options.map((option) => {
            const isAvailable = availableOptions.has(option);
            const isSelected = selectedValues.includes(option);
            return (
              <div
                key={option}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-accent cursor-pointer ${
                  !isAvailable && !isSelected ? "opacity-40" : ""
                }`}
                onClick={() => isAvailable || isSelected ? toggleValue(option) : null}
              >
                <Checkbox
                  checked={isSelected}
                  disabled={!isAvailable && !isSelected}
                  className="pointer-events-none"
                />
                <span className={`text-sm ${!isAvailable && !isSelected ? "text-muted-foreground" : ""}`}>
                  {formatOption ? formatOption(option) : option}
                </span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function Catalogue() {
  const { allFilms, loading, error } = useFilms();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(30);

  // Extract all unique filter options from all films
  const allFilterOptions = useMemo(() => {
    const genres = new Set<string>();
    const years = new Set<string>();
    const lengths = new Set<string>();
    const audiences = new Set<string>();
    const keywords = new Set<string>();

    allFilms.forEach((film) => {
      film.Film.Genre_List?.forEach((g) => genres.add(g.trim()));
      const yearMatch = film.Film.Date_of_completion?.match(/\b\d{4}\b/);
      if (yearMatch) years.add(yearMatch[0]);
      const len = getRoundedRuntime(film.Film.Runtime);
      if (len) lengths.add(len);
      if (film.Film.Target_Group?.Audience) audiences.add(film.Film.Target_Group.Audience.trim());
      if (film.Film.Keywords) {
        film.Film.Keywords.split(",").forEach((k) => {
          const trimmed = k.trim();
          if (trimmed) keywords.add(trimmed);
        });
      }
    });

    return {
      genres: Array.from(genres).sort(),
      years: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
      lengths: ["short", "mid-length", "full-length"].filter((cat) => lengths.has(cat)),
      audiences: Array.from(audiences).sort(),
      keywords: Array.from(keywords).sort(),
    };
  }, [allFilms]);

  // Calculate available options based on current filters (for graying out)
  const availableOptions = useMemo(() => {
    const getFilmsMatchingFilters = (excludeFilterKey: string) => {
      return allFilms.filter((film) => {
        const f = film.Film;
        const crew = film.Crew;

        const title = (f.Title_English || f.Title_Original || "").toLowerCase();
        const originalTitle = (f.Title_Original || "").toLowerCase();
        const logline = (film.Logline || "").toLowerCase();
        const director = (crew["Director(s)"] || "").toLowerCase();
        const country = (f.Country_of_production || "").toLowerCase();
        const producer = (film.Production_Company?.Production_Company_Name || "").toLowerCase();
        const festivals = (film.Festivals || []).map(fest => fest.Name_of_Festival.toLowerCase()).join(" ");
        const awards = (film.Awards || []).map(award => award.Festival_Section_of_Competition.toLowerCase()).join(" ");
        const search = searchTerm.toLowerCase();

        const genres = f.Genre_List?.map((g) => g.toLowerCase()) || [];
        const runtimeCategory = getRoundedRuntime(f.Runtime);
        const filmYear = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || "";
        const filmAudience = f.Target_Group?.Audience?.toLowerCase() || "";
        const filmKeywords = f.Keywords ? f.Keywords.split(",").map((k) => k.trim().toLowerCase()) : [];

        const matchesSearch =
          !searchTerm ||
          title.includes(search) ||
          originalTitle.includes(search) ||
          logline.includes(search) ||
          director.includes(search) ||
          country.includes(search) ||
          producer.includes(search) ||
          festivals.includes(search) ||
          awards.includes(search);

        const matchesGenre =
          excludeFilterKey === "genre" ||
          selectedGenres.length === 0 ||
          genres.some((g) => selectedGenres.map((sg) => sg.toLowerCase()).includes(g));

        const matchesYear =
          excludeFilterKey === "year" ||
          selectedYears.length === 0 ||
          selectedYears.includes(filmYear);

        const matchesLength =
          excludeFilterKey === "length" ||
          selectedLengths.length === 0 ||
          (runtimeCategory && selectedLengths.includes(runtimeCategory));

        const matchesAudience =
          excludeFilterKey === "audience" ||
          selectedAudiences.length === 0 ||
          selectedAudiences.map((a) => a.toLowerCase()).includes(filmAudience);

        const matchesKeywords =
          excludeFilterKey === "keywords" ||
          selectedKeywords.length === 0 ||
          filmKeywords.some((k) => selectedKeywords.map((sk) => sk.toLowerCase()).includes(k));

        return matchesSearch && matchesGenre && matchesYear && matchesLength && matchesAudience && matchesKeywords;
      });
    };

    const genreFilms = getFilmsMatchingFilters("genre");
    const yearFilms = getFilmsMatchingFilters("year");
    const lengthFilms = getFilmsMatchingFilters("length");
    const audienceFilms = getFilmsMatchingFilters("audience");
    const keywordFilms = getFilmsMatchingFilters("keywords");

    const availableGenres = new Set<string>();
    const availableYears = new Set<string>();
    const availableLengths = new Set<string>();
    const availableAudiences = new Set<string>();
    const availableKeywords = new Set<string>();

    genreFilms.forEach((film) => {
      film.Film.Genre_List?.forEach((g) => availableGenres.add(g.trim()));
    });

    yearFilms.forEach((film) => {
      const yearMatch = film.Film.Date_of_completion?.match(/\b\d{4}\b/);
      if (yearMatch) availableYears.add(yearMatch[0]);
    });

    lengthFilms.forEach((film) => {
      const len = getRoundedRuntime(film.Film.Runtime);
      if (len) availableLengths.add(len);
    });

    audienceFilms.forEach((film) => {
      if (film.Film.Target_Group?.Audience) availableAudiences.add(film.Film.Target_Group.Audience.trim());
    });

    keywordFilms.forEach((film) => {
      if (film.Film.Keywords) {
        film.Film.Keywords.split(",").forEach((k) => {
          const trimmed = k.trim();
          if (trimmed) availableKeywords.add(trimmed);
        });
      }
    });

    return {
      genres: availableGenres,
      years: availableYears,
      lengths: availableLengths,
      audiences: availableAudiences,
      keywords: availableKeywords,
    };
  }, [allFilms, searchTerm, selectedGenres, selectedYears, selectedLengths, selectedAudiences, selectedKeywords]);

  // Filter films for display
  const filteredFilms = useMemo(() => {
    return allFilms.filter((film) => {
      const f = film.Film;
      const crew = film.Crew;

      const title = (f.Title_English || f.Title_Original || "").toLowerCase();
      const originalTitle = (f.Title_Original || "").toLowerCase();
      const logline = (film.Logline || "").toLowerCase();
      const director = (crew["Director(s)"] || "").toLowerCase();
      const country = (f.Country_of_production || "").toLowerCase();
      const producer = (film.Production_Company?.Production_Company_Name || "").toLowerCase();
      const festivals = (film.Festivals || []).map(fest => fest.Name_of_Festival.toLowerCase()).join(" ");
      const awards = (film.Awards || []).map(award => award.Festival_Section_of_Competition.toLowerCase()).join(" ");
      const search = searchTerm.toLowerCase();

      const genres = f.Genre_List?.map((g) => g.toLowerCase()) || [];
      const runtimeCategory = getRoundedRuntime(f.Runtime);
      const filmYear = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || "";
      const filmAudience = f.Target_Group?.Audience?.toLowerCase() || "";
      const filmKeywords = f.Keywords ? f.Keywords.split(",").map((k) => k.trim().toLowerCase()) : [];

      const matchesSearch =
        !searchTerm ||
        title.includes(search) ||
        originalTitle.includes(search) ||
        logline.includes(search) ||
        director.includes(search) ||
        country.includes(search) ||
        producer.includes(search) ||
        festivals.includes(search) ||
        awards.includes(search);

      const matchesGenre =
        selectedGenres.length === 0 ||
        genres.some((g) => selectedGenres.map((sg) => sg.toLowerCase()).includes(g));

      const matchesYear =
        selectedYears.length === 0 ||
        selectedYears.includes(filmYear);

      const matchesLength =
        selectedLengths.length === 0 ||
        (runtimeCategory && selectedLengths.includes(runtimeCategory));

      const matchesAudience =
        selectedAudiences.length === 0 ||
        selectedAudiences.map((a) => a.toLowerCase()).includes(filmAudience);

      const matchesKeywords =
        selectedKeywords.length === 0 ||
        filmKeywords.some((k) => selectedKeywords.map((sk) => sk.toLowerCase()).includes(k));

      return matchesSearch && matchesGenre && matchesYear && matchesLength && matchesAudience && matchesKeywords;
    });
  }, [allFilms, searchTerm, selectedGenres, selectedYears, selectedLengths, selectedAudiences, selectedKeywords]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedGenres([]);
    setSelectedYears([]);
    setSelectedLengths([]);
    setSelectedAudiences([]);
    setSelectedKeywords([]);
    setVisibleCount(30);
  };

  const formatLengthOption = (value: string) => {
    if (value === "short") return "Short (under 40 min)";
    if (value === "mid-length") return "Mid-length (40-70 min)";
    return "Full-length (over 70 min)";
  };

  const hasActiveFilters =
    searchTerm ||
    selectedGenres.length > 0 ||
    selectedYears.length > 0 ||
    selectedLengths.length > 0 ||
    selectedAudiences.length > 0 ||
    selectedKeywords.length > 0;

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8">
          <p className="text-center">Loading films...</p>
        </div>
        <Footer />
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-8 sm:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-garamond mb-4 text-left">Line Up</h1>
          <div className="w-full h-[2px] bg-border mb-12"></div>

          {/* Filters */}
          <div className="mb-8 sm:mb-12 space-y-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search by title, director, festivals…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-card border-border"
              />
              <Button
                onClick={() => setSearchTerm(searchTerm)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Search
              </Button>
            </div>

            {/* Filter dropdowns */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <MultiSelectFilter
                label="Genres"
                options={allFilterOptions.genres}
                selectedValues={selectedGenres}
                onChange={setSelectedGenres}
                availableOptions={availableOptions.genres}
              />

              <MultiSelectFilter
                label="Years"
                options={allFilterOptions.years}
                selectedValues={selectedYears}
                onChange={setSelectedYears}
                availableOptions={availableOptions.years}
              />

              <MultiSelectFilter
                label="Lengths"
                options={allFilterOptions.lengths}
                selectedValues={selectedLengths}
                onChange={setSelectedLengths}
                availableOptions={availableOptions.lengths}
                formatOption={formatLengthOption}
              />

              <MultiSelectFilter
                label="Audiences"
                options={allFilterOptions.audiences}
                selectedValues={selectedAudiences}
                onChange={setSelectedAudiences}
                availableOptions={availableOptions.audiences}
              />

              <MultiSelectFilter
                label="Themes"
                options={allFilterOptions.keywords}
                selectedValues={selectedKeywords}
                onChange={setSelectedKeywords}
                availableOptions={availableOptions.keywords}
              />
            </div>

            {/* Reset button */}
            {hasActiveFilters && (
              <div className="text-center">
                <Button
                  onClick={resetFilters}
                  variant="outline"
                  className="px-16 bg-card hover:bg-primary hover:text-primary-foreground"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Results count */}
          <p className="text-center mb-6 text-muted-foreground">
            {filteredFilms.length} {filteredFilms.length === 1 ? "film" : "films"}
          </p>

          {/* Films grid */}
          {filteredFilms.length === 0 ? (
            <p className="text-center">No films match your current filter selection.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredFilms.slice(0, visibleCount).map((film, idx) => {
                  const f = film.Film;
                  const crew = film.Crew;
                  const title = f.Title_English || f.Title_Original || "Untitled";
                  const filmYear = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || "";
                  const runtime = formatRuntime(film);
                  const director = crew["Director(s)"] || "Unknown Director";
                  const slug = getFilmSlug(film);

                  return (
                    <Link key={idx} to={`/film/${slug}`} className="block group h-full">
                      <div className="bg-card rounded-lg overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-nunito text-xl mb-1 group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                            {title} {runtime && `| ${runtime}`} {filmYear && `| ${filmYear}`}
                          </h3>
                          <p className="text-xs text-white">by {director}</p>
                          {f.Country_of_production && (
                            <p className="text-xs">
                              <span className="font-bold">Country of production:</span> {f.Country_of_production}
                            </p>
                          )}
                        </div>
                        <div className="aspect-video bg-muted relative overflow-hidden flex-shrink-0">
                          <img
                            src={getFilmStillPaths(film, 1)[0]}
                            alt={`Still from ${title}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = getPlaceholderImage();
                            }}
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <p className="text-sm text-foreground/80 mb-2 flex-grow">
                            {film.Logline}
                          </p>

                          {/* Festival Information */}
                          <div className="mt-auto pt-4 border-t border-border/50 min-h-[5rem]">
                            {film.Festivals && film.Festivals.length > 0 && (
                              <>
                                <p className="text-xs font-bold text-primary mb-2 tracking-wide">
                                  Festival selections:
                                </p>
                                <ul className="text-[0.7rem] space-y-0.5">
                                  {film.Festivals.slice(0, 3).map((festival, idx) => (
                                    <li key={idx} className="flex items-start">
                                      <span className="mr-1.5">•</span>
                                      <span>{festival.Name_of_Festival}</span>
                                    </li>
                                  ))}
                                  {film.Festivals.length > 3 && (
                                    <li className="text-muted-foreground">+{film.Festivals.length - 3} more</li>
                                  )}
                                </ul>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {visibleCount < filteredFilms.length && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="dark"
                    onClick={() => setVisibleCount((prev) => prev + 15)}
                    className="px-8 py-3 font-semibold rounded-lg transition-all duration-300"
                  >
                    See More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
