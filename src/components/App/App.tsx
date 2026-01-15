// import { useState } from 'react'
import style from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { Toaster } from 'react-hot-toast';

export default function App() {
    return (
        <div className={style.app}>
            <Toaster />
            <SearchBar />
        </div>
    )
}