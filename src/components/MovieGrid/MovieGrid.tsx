import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
    items: Movie[];
    onMovieClick: (movie: Movie) => void;
}

export default function MovieGrid({ items, onMovieClick }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {items.map((movie) => (
                <li key={movie.id}>
                    <div className={css.card} onClick={() => onMovieClick(movie)}>
                        <img
                            className={css.image}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt="movie title"
                            loading="lazy"
                        />
                        <h2 className={css.title}>{movie.title}</h2>
                    </div>
                </li>
            ))}
        </ul>
    );
}
