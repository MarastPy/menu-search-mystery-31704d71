import { useState, useEffect, useMemo } from 'react';
import { useFilms } from '@/hooks/useFilms';
import { Film } from '@/types/film';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFilmPosterPath } from '@/utils/imageHelpers';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const getFilmSlug = (film: Film): string => {
  const title = film.Film.Title_English || film.Film.Title_Original;
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const { allFilms } = useFilms();
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      setSearchQuery('');
      setVisibleCount(10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const filteredFilms = useMemo(() => {
    if (!searchQuery.trim()) return allFilms;

    const query = searchQuery.toLowerCase();
    return allFilms.filter(film => {
      const f = film.Film;
      const crew = film.Crew;
      
      const title = (f.Title_English || '').toLowerCase();
      const originalTitle = (f.Title_Original || '').toLowerCase();
      const director = (crew['Director(s)'] || '').toLowerCase();
      const logline = (film.Logline || '').toLowerCase();
      const synopsis = (film.Synopsis || '').toLowerCase();

      return (
        title.includes(query) ||
        originalTitle.includes(query) ||
        director.includes(query) ||
        logline.includes(query) ||
        synopsis.includes(query)
      );
    });
  }, [allFilms, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-[min(1200px,95vw)] h-[min(90vh,920px)] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-in border border-white/10">
        {/* Search tools */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 p-4 sm:p-6 bg-black/40 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
          <Input
            type="search"
            placeholder="Search by title, director, synopsis…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0f0f0f] border-white/20 text-white placeholder:text-gray-500 focus:border-[#C5262A] transition-all text-base sm:text-lg py-4 sm:py-6"
            autoFocus
          />
          <Button 
            onClick={onClose}
            variant="outline"
            className="bg-[#2a2a2a] border-white/20 text-white hover:bg-[#C5262A] hover:text-white hover:border-[#C5262A] transition-all duration-300 px-4 sm:px-6 w-full sm:w-auto"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        {/* Stats */}
        <div className="px-6 py-3 text-sm text-[#C5262A] font-medium bg-black/20">
          {filteredFilms.length} {filteredFilms.length === 1 ? 'film' : 'films'}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-auto px-4 sm:px-6 pb-4 sm:pb-6 bg-[#0a0a0a]">
          {filteredFilms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg">
                {searchQuery ? `No results for "${searchQuery}"` : 'Start typing to search films...'}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {filteredFilms.slice(0, visibleCount).map((film, idx) => {
                  const f = film.Film;
                  const crew = film.Crew;
                  const title = f.Title_English || f.Title_Original || 'Untitled';
                  const year = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
                  const director = crew['Director(s)'] || 'Unknown Director';
                  const slug = getFilmSlug(film);
                  const poster = getFilmPosterPath(film);
                  const logline = film.Logline || '';

                  return (
                    <Link 
                      key={idx}
                      to={`/film/${slug}`}
                      onClick={onClose}
                      className="block bg-gradient-to-br from-[#1a1a1a] to-[#111] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/10 hover:border-[#C5262A]/50 group"
                    >
                      <div className="w-full aspect-[2/3] overflow-hidden bg-[#0a0a0a]">
                        <img 
                          src={poster} 
                          alt={`Poster for ${title}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-serif text-white text-lg mb-2 line-clamp-2 group-hover:text-[#C5262A] transition-colors duration-300">
                          {title}
                          {year && <span className="text-gray-400 text-sm"> | {year}</span>}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">by {director}</p>
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                          {logline}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {visibleCount < filteredFilms.length && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => setVisibleCount(prev => prev + 10)}
                    className="px-8 py-3 bg-[#C5262A] hover:bg-[#A01E22] text-white font-semibold rounded-lg transition-all duration-300"
                  >
                    Show More ({filteredFilms.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
