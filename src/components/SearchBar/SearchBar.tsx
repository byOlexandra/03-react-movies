import toast from 'react-hot-toast';
import styles from './SearchBar.module.css'

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
    const handleSubmit = (formdata: FormData) => {
        const movie = formdata.get('query') as string;
        if (!movie || movie.trim() === '') {
            toast.error('Please enter your search query.');
            return
        }
        localStorage.setItem('search-value', movie)
        onSubmit(movie);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            localStorage.removeItem('search-value')
        }
    }

    const handleMoviesList = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e) {
            localStorage.removeItem('last-movies')
        }
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a className={styles.logo}
                    href="/index.html"
                    onClick={handleMoviesList}
                >
                    Home</a>
                <a className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} action={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        defaultValue={localStorage.getItem('search-value') || ""}
                        onChange={handleInputChange}
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    )
}
