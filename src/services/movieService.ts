import axios from "axios";
import type { Movie } from "../types/movie";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string | undefined;
const API_BASE_URL = "https://api.themoviedb.org/3";

interface TMDBResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  const config = {
    params: { query, include_adult: false, language: "en-US", page: 1 },
    headers: { Authorization: `Bearer ${TOKEN}` },
  };

  const { data } = await axios.get<TMDBResponse>(
    `${API_BASE_URL}/search/movie`,
    config
  );
  return data.results;
}

export const buildPosterUrl = (path?: string | null): string =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : "";

export const buildBackdropUrl = (path?: string | null): string =>
  path ? `https://image.tmdb.org/t/p/original${path}` : "";
