import { useEffect, useMemo, useState } from 'react';
import { Film } from '@/types/film';

type AdditionalInfo = {
  Film: {
    Title_Original?: string;
    Title_English?: string;
    Title_Other?: string;
  };
  Ranking?: unknown;
  Review?: string;
  Festival_Distribution_Only?: string;
  Sales?: string;
  Status?: string;
  Download_poster?: string;
  Download_stills?: string;
  Download_presskit?: string;
  Sharing?: string;
  Trailer_url?: string;
};

const normalizeRanking = (value: unknown): number => {
  const digitsOnly = String(value ?? '')
    .replace(/[^\d-]/g, '')
    .trim();
  const parsed = digitsOnly && /[0-9]/.test(digitsOnly)
    ? Number.parseInt(digitsOnly, 10)
    : NaN;
  return Number.isFinite(parsed) ? parsed : Infinity;
};

const normalizeTitleKey = (value: unknown): string => {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ') // punctuation -> space
    .trim()
    .replace(/\s+/g, ' ');
};

const parseCompletionDate = (film: Film): Date | null => {
  const raw = film.Film?.Date_of_completion?.trim();
  if (!raw) return null;

  // Handles: "MM/YYYY"
  const mmYYYY = raw.match(/^(\d{1,2})\/(\d{4})$/);
  if (mmYYYY) {
    const month = Number(mmYYYY[1]);
    const year = Number(mmYYYY[2]);
    if (month >= 1 && month <= 12) return new Date(year, month - 1, 1);
  }

  // Handles: "YYYY" (or anything containing a year)
  const yearOnly = raw.match(/\b(\d{4})\b/);
  if (yearOnly && yearOnly[1]) return new Date(Number(yearOnly[1]), 0, 1);

  // Fallback to Date parsing (ISO etc.)
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const useFilms = () => {
  const [allFilms, setAllFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const cacheBuster = `?t=${Date.now()}`;
        const baseUrl = import.meta.env.BASE_URL;

        const [filmsResponse, additionalResponse] = await Promise.all([
          fetch(`${baseUrl}data/all_html_data.json${cacheBuster}`),
          fetch(`${baseUrl}data/aditional_info.json${cacheBuster}`),
        ]);

        if (!filmsResponse.ok || !additionalResponse.ok) {
          throw new Error('Failed to fetch film data');
        }

        const filmsData: Film[] = await filmsResponse.json();
        const additionalData: AdditionalInfo[] = await additionalResponse.json();

        // Build a lookup map for robust matching across title variants.
        const additionalByTitle = new Map<string, AdditionalInfo>();
        for (const add of additionalData) {
          const candidates = [
            add.Film?.Title_Original,
            add.Film?.Title_English,
            add.Film?.Title_Other,
          ].filter(Boolean) as string[];

          for (const title of candidates) {
            const key = normalizeTitleKey(title);
            if (key && !additionalByTitle.has(key)) additionalByTitle.set(key, add);
          }
        }

        const mergedFilms = filmsData.map((film) => {
          const candidates = [
            film.Film?.Title_Original,
            film.Film?.Title_English,
            film.Film?.Title_Other,
          ].filter(Boolean) as string[];

          const matched = candidates
            .map((t) => additionalByTitle.get(normalizeTitleKey(t)))
            .find(Boolean);

          if (matched) {
            const safeRanking = normalizeRanking(matched.Ranking);

            return {
              ...film,
              Ranking: String(matched.Ranking ?? ''),
              ParsedRanking: safeRanking,
              Review: matched.Review,
              Festival_Distribution_Only: matched.Festival_Distribution_Only,
              Sales: matched.Sales,
              Status: matched.Status,
              Download_poster: matched.Download_poster,
              Download_stills: matched.Download_stills,
              Download_presskit: matched.Download_presskit,
              Sharing: matched.Sharing,
              Trailer_url: matched.Trailer_url,
            };
          }

          // No match in additional info => treat as unranked, but still sortable by completion date
          return {
            ...film,
            ParsedRanking: Infinity,
          };
        });

        // Sort: ranking first (ascending), then date of completion (newest first)
        mergedFilms.sort((a, b) => {
          const aRank = a.ParsedRanking ?? Infinity;
          const bRank = b.ParsedRanking ?? Infinity;
          const aHasRank = aRank !== Infinity;
          const bHasRank = bRank !== Infinity;

          if (aHasRank && bHasRank) {
            if (aRank !== bRank) return aRank - bRank;
          } else if (aHasRank && !bHasRank) {
            return -1;
          } else if (!aHasRank && bHasRank) {
            return 1;
          }

          const aDate = parseCompletionDate(a);
          const bDate = parseCompletionDate(b);
          if (aDate && bDate) return bDate.getTime() - aDate.getTime();
          if (aDate && !bDate) return -1;
          if (!aDate && bDate) return 1;
          return 0;
        });

        if (import.meta.env.DEV) {
          const missingRanking = mergedFilms
            .filter((f) => f.ParsedRanking === Infinity)
            .map((f) => f.Film?.Title_English || f.Film?.Title_Original || 'Unknown');
          if (missingRanking.length > 0) {
            console.info('[useFilms] Films without ranking (no additional-info match):', missingRanking);
          }
        }

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
