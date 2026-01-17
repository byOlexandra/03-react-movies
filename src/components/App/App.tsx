import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMovies } from '../../services/movieService';


export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isQuery, setIsQuery] = useState(false)

    const handleSearch = async (query: string) => {
        setIsError(false);
        setIsLoading(true);
        setIsQuery(true);
        try {
            // HTTP-request
            await fetchMovies(query);
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
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {isQuery && <MovieGrid />}
        </div>
    )
}