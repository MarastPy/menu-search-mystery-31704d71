import { Film } from '@/types/film';

/**
 * Converts a film title to a standardized folder name format
 * e.g., "About a Cow" -> "about_a_cow"
 */
export const getFilmFolderName = (film: Film): string => {
  const title = film.Film.Title_English || film.Film.Title_Original || '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
};

/**
 * Gets the poster image path for a film
 */
export const getFilmPosterPath = (film: Film): string => {
  const folderName = getFilmFolderName(film);
  return `/src/images/posters/${folderName}/${folderName}.jpg`;
};

/**
 * Gets still image paths for a film (typically 3 stills)
 */
export const getFilmStillPaths = (film: Film, count: number = 3): string[] => {
  const folderName = getFilmFolderName(film);
  return Array.from({ length: count }, (_, i) => 
    `/src/images/stills/${folderName}/${folderName}_${i + 1}.jpg`
  );
};

/**
 * Gets a fallback placeholder for missing images
 */
export const getPlaceholderImage = (): string => {
  return '/placeholder.svg';
};
