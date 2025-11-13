import { Film } from '@/types/film';

// Import all poster images dynamically
const posterImages = import.meta.glob('/src/images/posters/**/*.{jpg,jpeg,png}', { eager: true, as: 'url' });

// Import all still images dynamically
const stillImages = import.meta.glob('/src/images/stills/**/*.{jpg,jpeg,png}', { eager: true, as: 'url' });

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
  const posterPath = `/src/images/posters/${folderName}/${folderName}.jpg`;
  return posterImages[posterPath] || getPlaceholderImage();
};

/**
 * Gets still image paths for a film (typically 3 stills)
 */
export const getFilmStillPaths = (film: Film, count: number = 3): string[] => {
  const folderName = getFilmFolderName(film);
  return Array.from({ length: count }, (_, i) => {
    const stillPath = `/src/images/stills/${folderName}/${folderName}_${i + 1}.jpg`;
    return stillImages[stillPath] || getPlaceholderImage();
  });
};

/**
 * Gets a fallback placeholder for missing images
 */
export const getPlaceholderImage = (): string => {
  return '/placeholder.svg';
};
