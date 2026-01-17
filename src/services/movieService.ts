import type { Movie } from "../types/movie";
import axios, { type AxiosResponse } from 'axios';

export async function fetchMovies(query: string): Promise<Movie[] | undefined> {
    const response: AxiosResponse = await axios("https://api.themoviedb.org/3/search/movie", {
        params: {
            query: query,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    });

    return response.data.results;
}
