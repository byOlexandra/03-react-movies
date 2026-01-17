import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
    items: Movie[];
}

export default function MovieGrid({ items }: MovieGridProps) {
    return (
        <ul className={css.grid}>
            {items.map((movie) => (
                <li key={movie.id}>
                    <div className={css.card}>
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
