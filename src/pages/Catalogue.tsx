import { useState, useEffect, useMemo } from 'react';
import { useFilms } from '@/hooks/useFilms';
import { Film } from '@/types/film';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Header } from '@/components/Header';
import { Link } from 'react-router-dom';
import { getFilmPosterPath, getPlaceholderImage } from '@/utils/imageHelpers';

const getRoundedRuntime = (runtimeString: string): string | null => {
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
  totalMinutes = Math.round(totalMinutes);

  if (totalMinutes < 40) return "short";
  if (totalMinutes <= 70) return "mid-length";
  return "full-length";
};

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

export default function Catalogue() {
  const { allFilms, loading, error } = useFilms();
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const [genre, setGenre] = useState('all');
  const [year, setYear] = useState('all');
  const [length, setLength] = useState('all');
  const [audience, setAudience] = useState('all');
  const [keywords, setKeywords] = useState('all');
  const [visibleCount, setVisibleCount] = useState(15);

  // Extract unique filter options based on currently filtered films (cascading)
  const filterOptions = useMemo(() => {
    const currentFilters = {
      searchTerm,
      genre,
      year,
      length,
      audience,
      keywords
    };

    // Helper function to get films matching all filters EXCEPT the specified one
    const getRelevantFilmsForFilter = (excludeFilterKey: keyof typeof currentFilters) => {
      return allFilms.filter(film => {
        const f = film.Film;
        const crew = film.Crew;
        
        const title = (f.Title_English || f.Title_Original || '').toLowerCase();
        const originalTitle = (f.Title_Original || '').toLowerCase();
        const logline = (film.Logline || '').toLowerCase();
        const director = (crew['Director(s)'] || '').toLowerCase();
        const search = searchTerm.toLowerCase();

        const genres = f.Genre_List?.map(g => g.toLowerCase()) || [];
        const runtimeCategory = getRoundedRuntime(f.Runtime);
        const filmYear = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
        const filmAudience = f.Target_Group?.Audience?.toLowerCase() || '';
        const filmKeywords = f.Keywords ? f.Keywords.split(',').map(k => k.trim().toLowerCase()) : [];

        return (
          (excludeFilterKey === 'searchTerm' || !searchTerm || title.includes(search) || originalTitle.includes(search) || 
           logline.includes(search) || director.includes(search)) &&
          (excludeFilterKey === 'genre' || genre === 'all' || !genre || genres.includes(genre.toLowerCase())) &&
          (excludeFilterKey === 'year' || year === 'all' || !year || filmYear === year) &&
          (excludeFilterKey === 'length' || length === 'all' || !length || runtimeCategory === length) &&
          (excludeFilterKey === 'audience' || audience === 'all' || !audience || filmAudience === audience.toLowerCase()) &&
          (excludeFilterKey === 'keywords' || keywords === 'all' || !keywords || filmKeywords.includes(keywords.toLowerCase()))
        );
      });
    };

    // Get unique options for each filter
    const genreFilms = getRelevantFilmsForFilter('genre');
    const yearFilms = getRelevantFilmsForFilter('year');
    const lengthFilms = getRelevantFilmsForFilter('length');
    const audienceFilms = getRelevantFilmsForFilter('audience');
    const keywordFilms = getRelevantFilmsForFilter('keywords');

    const genres = new Set<string>();
    const years = new Set<string>();
    const lengths = new Set<string>();
    const audiences = new Set<string>();
    const keywordsList = new Set<string>();

    genreFilms.forEach(film => {
      film.Film.Genre_List?.forEach(g => genres.add(g.trim()));
    });

    yearFilms.forEach(film => {
      const yearMatch = film.Film.Date_of_completion?.match(/\b\d{4}\b/);
      if (yearMatch) years.add(yearMatch[0]);
    });

    lengthFilms.forEach(film => {
      const len = getRoundedRuntime(film.Film.Runtime);
      if (len) lengths.add(len);
    });

    audienceFilms.forEach(film => {
      if (film.Film.Target_Group?.Audience) audiences.add(film.Film.Target_Group.Audience.trim());
    });

    keywordFilms.forEach(film => {
      if (film.Film.Keywords) {
        film.Film.Keywords.split(',').forEach(k => {
          const trimmed = k.trim();
          if (trimmed) keywordsList.add(trimmed);
        });
      }
    });

    return {
      genres: Array.from(genres).sort(),
      years: Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)),
      lengths: ['short', 'mid-length', 'full-length'].filter(cat => lengths.has(cat)),
      audiences: Array.from(audiences).sort(),
      keywords: Array.from(keywordsList).sort()
    };
  }, [allFilms, searchTerm, genre, year, length, audience, keywords]);

  // Filter films for display
  const filteredFilms = useMemo(() => {
    return allFilms.filter(film => {
      const f = film.Film;
      const crew = film.Crew;
      
      const title = (f.Title_English || f.Title_Original || '').toLowerCase();
      const originalTitle = (f.Title_Original || '').toLowerCase();
      const logline = (film.Logline || '').toLowerCase();
      const director = (crew['Director(s)'] || '').toLowerCase();
      const search = searchTerm.toLowerCase();

      const genres = f.Genre_List?.map(g => g.toLowerCase()) || [];
      const runtimeCategory = getRoundedRuntime(f.Runtime);
      const filmYear = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
      const filmAudience = f.Target_Group?.Audience?.toLowerCase() || '';
      const filmKeywords = f.Keywords ? f.Keywords.split(',').map(k => k.trim().toLowerCase()) : [];

      return (
        (!searchTerm || title.includes(search) || originalTitle.includes(search) || 
         logline.includes(search) || director.includes(search)) &&
        (genre === 'all' || !genre || genres.includes(genre.toLowerCase())) &&
        (year === 'all' || !year || filmYear === year) &&
        (length === 'all' || !length || runtimeCategory === length) &&
        (audience === 'all' || !audience || filmAudience === audience.toLowerCase()) &&
        (keywords === 'all' || !keywords || filmKeywords.includes(keywords.toLowerCase()))
      );
    });
  }, [allFilms, searchTerm, genre, year, length, audience, keywords]);

  const resetFilters = () => {
    setSearchTerm('');
    setTempSearchTerm('');
    setGenre('all');
    setYear('all');
    setLength('all');
    setAudience('all');
    setKeywords('all');
    setVisibleCount(10);
  };

  const performSearch = () => {
    setSearchTerm(tempSearchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-24 px-8">
          <p className="text-center">Loading films...</p>
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

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 sm:pt-32 pb-8 sm:pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-4 text-left">Line Up</h1>
          <div className="w-40 h-1 bg-border mb-12"></div>
          
          {/* Filters */}
          <div className="mb-8 sm:mb-12 space-y-4">
            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search by title, director, synopsis…"
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
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {filterOptions.genres.map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {filterOptions.years.map(y => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={length} onValueChange={setLength}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
                  <SelectValue placeholder="Length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Lengths</SelectItem>
                  <SelectItem value="short">Short (under 40 min)</SelectItem>
                  <SelectItem value="mid-length">Mid-length (40-70 min)</SelectItem>
                  <SelectItem value="full-length">Full-length (over 70 min)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
                  <SelectValue placeholder="Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Audiences</SelectItem>
                  {filterOptions.audiences.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={keywords} onValueChange={setKeywords}>
                <SelectTrigger className="w-full sm:w-[180px] bg-card border-border">
                  <SelectValue placeholder="Themes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  {filterOptions.keywords.map(k => (
                    <SelectItem key={k} value={k}>{k}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset button */}
            <div className="text-center">
              <Button 
                onClick={resetFilters} 
                variant="outline"
                className="px-16 bg-card hover:bg-primary hover:text-primary-foreground"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results count */}
          <p className="text-center mb-6 text-muted-foreground">
            {filteredFilms.length} {filteredFilms.length === 1 ? 'film' : 'films'}
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
                  const title = f.Title_English || f.Title_Original || 'Untitled';
                  const filmYear = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
                  const exactMinutes = parseRuntimeToMinutes(f.Runtime);
                  const director = crew['Director(s)'] || 'Unknown Director';
                  const slug = getFilmSlug(film);

                  return (
                    <Link 
                      key={idx} 
                      to={`/film/${slug}`}
                      className="block group h-full"
                    >
                      <div className="bg-card rounded-lg overflow-hidden transition-transform hover:scale-105 h-full flex flex-col">
                        <div className="aspect-video bg-muted relative overflow-hidden flex-shrink-0">
                          <img 
                            src={getFilmPosterPath(film)} 
                            alt={`Still from ${title}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = getPlaceholderImage();
                            }}
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="font-serif text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {f.Title_Original || title} {exactMinutes && `| ${exactMinutes}min`} {filmYear && `| ${filmYear}`}
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
              {visibleCount < filteredFilms.length && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="dark"
                    onClick={() => setVisibleCount(prev => prev + 15)}
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
    </>
  );
}
