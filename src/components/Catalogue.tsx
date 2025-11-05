import { useFilms } from '@/hooks/useFilms';
import { Badge } from '@/components/ui/badge';

export const Catalogue = () => {
  const { allFilms, loading, error } = useFilms();
  
  // Show top 6 films for preview on index page
  const topFilms = allFilms.slice(0, 6);
  return (
    <section id="catalogue" className="py-[90px] bg-[#2B2B2B] text-[#f0f2f5]">
      <div className="max-w-[1200px] mx-auto px-[2cm]">
        <h1 className="font-serif text-[#f0f2f5] text-[3em] mb-4">Film Catalogue</h1>
        <hr className="border-white/20 mb-12" />
        
        {loading && <p className="text-center text-white">Loading films...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px_25px] justify-center max-w-[1100px] mx-auto mb-10">
          {topFilms.map((film, index) => (
            <div 
              key={index}
              className="bg-[#2b2b2b] rounded-[15px] overflow-hidden shadow-[0_6px_14px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_6px_15px_rgba(0,0,0,0.3)] cursor-pointer text-white flex flex-col h-full p-[25px]"
            >
              <div className="w-full h-[250px] object-cover block rounded-[5px] mb-3 overflow-hidden group">
                <img 
                  src={film.Download_poster || "/placeholder.svg"} 
                  alt={film.Film.Title_English || film.Film.Title_Original}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-2.5 flex-grow flex flex-col">
                <h3 className="font-serif text-[1.6em] mb-2 text-white text-left">
                  {film.Film.Title_English || film.Film.Title_Original}
                </h3>
                {film.Film.Title_Original !== film.Film.Title_English && (
                  <p className="text-[.9em] text-gray-400 text-left mb-2 italic">{film.Film.Title_Original}</p>
                )}
                <div className="flex flex-wrap gap-2 mb-2">
                  {film.Film.Genre_List && film.Film.Genre_List.length > 0 && film.Film.Genre_List.map((genre, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">{genre}</Badge>
                  ))}
                </div>
                <p className="text-[.9em] text-white text-left mb-2">
                  {film.Film.Runtime} • {new Date(film.Film.Date_of_completion).getFullYear()}
                </p>
                <p className="text-[1em] text-white text-left mb-2">{film.Crew["Director(s)"]}</p>
                <p className="text-[.95em] text-white leading-[1.5] mt-auto text-justify">{film.Logline}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-[30px]">
          <a 
            href="#" 
            className="inline-block py-3 px-6 rounded-md transition-all duration-300 mt-6 text-base font-bold border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#2b2b2b]"
          >
            ALL FILMS
          </a>
        </div>
      </div>
    </section>
  );
};
