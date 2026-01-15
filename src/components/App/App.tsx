import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import style from './App.module.css'
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';


export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSearch = async (data: string): Promise<Movie[] | undefined> => {
        if (data) setIsQuery(true);
        try {
            setIsLoading(true)
            const response = await axios('https://api.themoviedb.org/3/search/movie',
                {
                    params: {
                        query: data,
                    },
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                    }
                }
            )
            console.log(response.data)
            return response.data.results
        } catch (error) {
            setIsError(true)
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsError(false)
        }
    }
    const [isQuery, setIsQuery] = useState(false)

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