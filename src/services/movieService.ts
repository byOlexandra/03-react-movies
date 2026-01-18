import type { Movie } from "../types/movie";
import axios from 'axios';

interface AxiosResponseProps {
    results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
    const response = await axios.get<AxiosResponseProps>("https://api.themoviedb.org/3/search/movie", {
        params: {
            query: query,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    });
    console.log(response.data.results);
    return response.data.results;
}
