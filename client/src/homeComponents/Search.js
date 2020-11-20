import React, { useState, useRef, useEffect } from 'react'
import '../styles/Search.css'
import stockimg from '../img/stock.jpg'
import 'bulma/css/bulma.css';

export default function Search() {
    const [list, setList] = useState([])
    const searchBar = useRef()

    useEffect(() => {
        setList(getList())
    }, [])

    return (
        <div>
            <div className="level-left">
                <label className="level-item mr-2">Type a Stock Ticker</label>
                <input ref={searchBar} input="text" className="search level-item mr-2" placeholder="Search stock..." />
                <button className="button is-rounded level-item" onClick={getStock}>Search</button>
                </div>
                <img className = 'stockimg' src= {stockimg}></img>

        </div>
    )

    async function getStock() {
        const symbol = searchBar.current.value.toUpperCase()
        window.location = `/${symbol}`
    }

    async function getList() {
        const response = await fetch('/index', {
            headers: { 'Content-Type': 'application/json' }
        })
        const tickerList = await response.json()
        return tickerList
    }
}
