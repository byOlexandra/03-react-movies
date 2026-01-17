import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';


export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);

    const handleSearch = async (query: string) => {
        if (!query) return;

        setIsError(false);
        setMovies([])
        setIsLoading(true);

        try {
            // HTTP-request
            const data = await fetchMovies(query);
            if (data.length === 0) {
                toast.error('No movies found for your request.');
                return;
            }
            setMovies(data);
        } catch (error) {
            setIsError(true);
            console.error("Помилка при завантаженні:", error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className={style.app}>
            <Toaster />
            <SearchBar onSubmit={handleSearch} />
            {isLoading ? <Loader /> : <MovieGrid items={movies} />}
            {isError && <ErrorMessage />}
        </div>
    )
}