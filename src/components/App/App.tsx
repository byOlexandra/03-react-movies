// import { useState } from 'react'
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'

export default function App() {
    return (
        <div className={style.app}>
            <SearchBar />
        </div>
    )
}