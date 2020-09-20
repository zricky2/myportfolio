import React, { useRef } from 'react'

export default function Search() {
    const searchBar = useRef()

    async function getStock() {
        const symbol = searchBar.current.value.toUpperCase()
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=30min&apikey=${process.env.API_KEY}`
        try {
            const response = await fetch(url)
            const data = await response.json()
            window.location = `/${symbol}`
        } catch(err) {
            alert(err)
        }
    }
    return (
        <div>
            <label>Type a Stock Ticker</label>
            <input ref={searchBar} input="text" className="search" placeholder="AMD" />
            <button onClick={getStock}>Search</button>
        </div>
    )
}
