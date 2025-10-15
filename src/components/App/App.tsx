import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie, MovieSearchResponse } from "../../types/movie";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<Movie | null>(null);


  const { data, isPending, isError, isSuccess } = useQuery<MovieSearchResponse>({
    queryKey: ["movies", { query, page }],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isSuccess && (data?.results?.length ?? 0) === 0) {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;


  const handleSubmit = (q: string) => {
    const trimmed = q.trim();
    setSelected(null);
    setPage(1);
    setQuery(trimmed);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSubmit} />

      {isPending && <Loader />}
      {isError && <ErrorMessage />}

      {!isPending && !isError && (
        <>
          {totalPages > 1 && (
            <ReactPaginate
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={`${css.pagination} ${css.paginationTop}`}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}

          <MovieGrid movies={movies} onSelect={setSelected} />
        </>
      )}

      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
