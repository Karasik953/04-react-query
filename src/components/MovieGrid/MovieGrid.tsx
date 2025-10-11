import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { buildPosterUrl } from "../../services/movieService";

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={css.card} onClick={() => onSelect(m)}>
            {m.poster_path && (
              <img
                className={css.image}
                src={buildPosterUrl(m.poster_path)}
                alt={m.title}
                loading="lazy"
              />
            )}
            <h2 className={css.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
