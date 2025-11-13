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
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [length, setLength] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');

  // Extract unique filter options
  const filterOptions = useMemo(() => {
    const genres = new Set<string>();
    const years = new Set<string>();
    const lengths = new Set<string>();
    const audiences = new Set<string>();
    const keywordsList = new Set<string>();

    allFilms.forEach(film => {
      const f = film.Film;
      f.Genre_List?.forEach(g => genres.add(g.trim()));
      
      const yearMatch = f.Date_of_completion?.match(/\b\d{4}\b/);
      if (yearMatch) years.add(yearMatch[0]);
      
      const len = getRoundedRuntime(f.Runtime);
      if (len) lengths.add(len);
      
      if (f.Target_Group?.Audience) audiences.add(f.Target_Group.Audience.trim());
      
      if (f.Keywords) {
        f.Keywords.split(',').forEach(k => {
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
  }, [allFilms]);

  // Filter films
  const filteredFilms = useMemo(() => {
    return allFilms.filter(film => {
      const f = film.Film;
      const crew = film.Crew;
      
      const title = (f.Title_English || f.Title_Original || '').toLowerCase();
      const originalTitle = (f.Title_Original || '').toLowerCase();
      const logline = (film.Logline || '').toLowerCase();
      const synopsis = (film.Synopsis || '').toLowerCase();
      const director = (crew['Director(s)'] || '').toLowerCase();
      const search = searchTerm.toLowerCase();

      const genres = f.Genre_List?.map(g => g.toLowerCase()) || [];
      const runtimeCategory = getRoundedRuntime(f.Runtime);
      const filmYear = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
      const filmCountry = f.Country_of_production?.toLowerCase() || '';
      const filmRating = f.Target_Group?.Rating?.toLowerCase() || '';
      const filmAudience = f.Target_Group?.Audience?.toLowerCase() || '';
      const filmKeywords = f.Keywords ? f.Keywords.split(',').map(k => k.trim().toLowerCase()) : [];

      return (
        (!searchTerm || title.includes(search) || originalTitle.includes(search) || 
         logline.includes(search) || synopsis.includes(search) || director.includes(search)) &&
        (!genre || genres.includes(genre.toLowerCase())) &&
        (!year || filmYear === year) &&
        (!length || runtimeCategory === length) &&
        (!audience || filmAudience === audience.toLowerCase()) &&
        (!keywords || filmKeywords.includes(keywords.toLowerCase()))
      );
    });
  }, [allFilms, searchTerm, genre, year, length, audience, keywords]);

  const resetFilters = () => {
    setSearchTerm('');
    setTempSearchTerm('');
    setGenre('');
    setYear('');
    setLength('');
    setAudience('');
    setKeywords('');
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
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <h1 className="text-5xl font-serif mb-12 text-center">Film Catalogue</h1>
          
          {/* Filters */}
          <div className="mb-12 space-y-4">
            {/* Search */}
            <div className="flex gap-3 max-w-2xl mx-auto">
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
            <div className="flex flex-wrap gap-4 justify-center">
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className="w-[180px] bg-card border-border">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Genres</SelectItem>
                  {filterOptions.genres.map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="w-[180px] bg-card border-border">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Years</SelectItem>
                  {filterOptions.years.map(y => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={length} onValueChange={setLength}>
                <SelectTrigger className="w-[180px] bg-card border-border">
                  <SelectValue placeholder="Length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Lengths</SelectItem>
                  <SelectItem value="short">Short (under 40 min)</SelectItem>
                  <SelectItem value="mid-length">Mid-length (40-70 min)</SelectItem>
                  <SelectItem value="full-length">Full-length (over 70 min)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger className="w-[180px] bg-card border-border">
                  <SelectValue placeholder="Audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Audiences</SelectItem>
                  {filterOptions.audiences.map(a => (
                    <SelectItem key={a} value={a}>{a}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={keywords} onValueChange={setKeywords}>
                <SelectTrigger className="w-[180px] bg-card border-border">
                  <SelectValue placeholder="Themes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Themes</SelectItem>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFilms.map((film, idx) => {
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
                    className="block group"
                  >
                    <div className="bg-card rounded-lg overflow-hidden transition-transform hover:scale-105">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img 
                          src={getFilmPosterPath(film)} 
                          alt={`Still from ${title}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = getPlaceholderImage();
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-xl mb-1 group-hover:text-primary transition-colors">
                          {title}
                          {filmYear && <span className="text-muted-foreground"> | {filmYear}</span>}
                          {exactMinutes && <span className="text-muted-foreground"> | {exactMinutes} min</span>}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">by {director}</p>
                        {f.Genre_List && f.Genre_List.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {f.Genre_List.slice(0, 3).map((g, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {g}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-foreground/80 line-clamp-3">
                          {film.Logline}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
