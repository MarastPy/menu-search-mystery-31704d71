import { useState, useEffect } from 'react';
import { Film } from '@/types/film';

export const useFilms = () => {
  const [allFilms, setAllFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        // Cache-busting: append timestamp to ensure fresh data
        const cacheBuster = `?t=${Date.now()}`;
        const baseUrl = import.meta.env.BASE_URL;
        const [filmsResponse, additionalResponse] = await Promise.all([
          fetch(`${baseUrl}data/all_html_data.json${cacheBuster}`),
          fetch(`${baseUrl}data/aditional_info.json${cacheBuster}`)
        ]);

        if (!filmsResponse.ok || !additionalResponse.ok) {
          throw new Error('Failed to fetch film data');
        }

        const filmsData: Film[] = await filmsResponse.json();
        const additionalData: any[] = await additionalResponse.json();

        // Merge additional info into films data
        const mergedFilms = filmsData.map(film => {
          const additional = additionalData.find(
            add => add.Film.Title_Original === film.Film.Title_Original
          );
          
          if (additional) {
            return {
              ...film,
              Ranking: additional.Ranking,
              ParsedRanking: parseInt(additional.Ranking, 10) || Infinity,
              Review: additional.Review,
              Festival_Distribution_Only: additional.Festival_Distribution_Only,
              Sales: additional.Sales,
              Status: additional.Status,
              Download_poster: additional.Download_poster,
              Download_stills: additional.Download_stills,
              Download_presskit: additional.Download_presskit,
              Sharing: additional.Sharing,
              Trailer_url: additional.Trailer_url
            };
          }
          
          return {
            ...film,
            ParsedRanking: Infinity
          };
        });

        // Sort by ranking
        mergedFilms.sort((a, b) => (a.ParsedRanking || Infinity) - (b.ParsedRanking || Infinity));

        setAllFilms(mergedFilms);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return { allFilms, loading, error };
};
