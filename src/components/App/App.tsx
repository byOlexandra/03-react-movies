import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';


export default function App() {
    const handleSearch = (data: string) => {
        if (data) setIsQuery(true);
    }
    const [isQuery, setIsQuery] = useState(false)

    return (
        <div className={style.app}>
            <Toaster />
            <SearchBar onSubmit={handleSearch} />
            {isQuery && <MovieGrid />}
        </div>
    )
}