// src/services/movieService.ts
import axios from "axios";
import type { Movie } from "../types/movie";

export type MovieSearchResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
const API_BASE_URL = "https://api.themoviedb.org/3";

if (!TOKEN) {
  console.warn("⚠️ TMDB token not found. Add VITE_TMDB_TOKEN to .env");
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<MovieSearchResponse> {
  const config = {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const { data } = await axios.get<MovieSearchResponse>(
    `${API_BASE_URL}/search/movie`,
    config
  );

  return data;
}

// зображення
export const buildPosterUrl = (path?: string | null): string =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export const buildBackdropUrl = (path?: string | null): string =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";
