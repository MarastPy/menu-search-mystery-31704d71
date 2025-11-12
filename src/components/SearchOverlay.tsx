import { useState, useEffect, useMemo } from 'react';
import { useFilms } from '@/hooks/useFilms';
import { Film } from '@/types/film';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      setSearchQuery('');
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-[min(1200px,92vw)] h-[min(90vh,920px)] bg-[#111] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Search tools */}
        <div className="grid grid-cols-[1fr_auto] gap-3 p-4 bg-[#181818] border-b border-white/10 sticky top-0 z-10">
          <Input
            type="search"
            placeholder="Search by title, director, synopsis…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0f0f0f] border-white/15 text-white"
            autoFocus
          />
          <Button 
            onClick={onClose}
            variant="outline"
            className="bg-[#2a2a2a] border-white/15 text-white hover:bg-[#353535]"
          >
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
        </div>

        {/* Stats */}
        <div className="px-4 py-2 text-sm text-[#bbb]">
          {filteredFilms.length} {filteredFilms.length === 1 ? 'film' : 'films'}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-auto px-4 pb-4 bg-background">
          {filteredFilms.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              {searchQuery ? `No results for "${searchQuery}"` : 'No films loaded'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFilms.map((film, idx) => {
                const f = film.Film;
                const crew = film.Crew;
                const title = f.Title_English || f.Title_Original || 'Untitled';
                const year = f.Date_of_completion?.match(/\b\d{4}\b/)?.[0] || '';
                const director = crew['Director(s)'] || 'Unknown Director';
                const slug = getFilmSlug(film);

                return (
                  <Link 
                    key={idx}
                    to={`/film/${slug}`}
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="bg-card rounded-lg overflow-hidden transition-transform hover:scale-105">
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <img 
                          src="/placeholder.svg" 
                          alt={`Still from ${title}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors">
                          {title}
                          {year && <span className="text-muted-foreground text-sm"> | {year}</span>}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">by {director}</p>
                        <p className="text-sm text-foreground/80 line-clamp-2">
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
      </div>
    </div>
  );
};
