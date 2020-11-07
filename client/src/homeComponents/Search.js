import React, { useRef } from 'react'

export default function Search() {
    const searchBar = useRef()

    async function getStock() {
        const symbol = searchBar.current.value.toUpperCase()
        window.location = `/${symbol}`
    }
    return (
        <div>
            <label>Type a Stock Ticker</label>
            <input ref={searchBar} input="text" className="search" placeholder="AMD" />
            <button onClick={getStock}>Search</button>
        </div>
    )
}
