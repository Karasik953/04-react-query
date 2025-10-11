import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selected, setSelected] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // тепер приймаємо рядок, як вимагає перевірка
  const handleSubmit = async (query: string) => {
    const q = (query || "").trim();

    setMovies([]);
    setSelected(null);

    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetchMovies(q);

      if (!res.length) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSubmit} />

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} onSelect={setSelected} />
      )}

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
