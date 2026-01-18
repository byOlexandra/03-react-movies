import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieModal from '../MovieModal/MovieModal';
import CameraIcon from '../CameraIcon/CameraIcon';

export default function App() {
    const [isCameraIcon, setIsCameraIcon] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [movies, setMovies] = useState<Movie[]>(() => {
        const savedMovies = localStorage.getItem('last-movies');
        return savedMovies ? JSON.parse(savedMovies) : [];
    });

    useEffect(() => {
        if (movies.length > 0) {
            setIsCameraIcon(false)
            localStorage.setItem('last-movies', JSON.stringify(movies))
        }
    }, [movies])

    const handleSearch = async (query: string) => {
        if (!query) return;

        setIsCameraIcon(false)
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

    const handleModalClose = () => {
        setSelectedMovie(null)
    }

    return (
        <>
            <div className={style.background}></div>
            <div>
                <Toaster />
                <SearchBar onSubmit={handleSearch} />
                {isCameraIcon && <CameraIcon />}
                {isLoading ? <Loader /> : <MovieGrid movies={movies} onSelect={setSelectedMovie} />}
                {isError && <ErrorMessage />}
                {selectedMovie && <MovieModal onClose={handleModalClose} movie={selectedMovie} />}
            </div>
        </>
    )
}