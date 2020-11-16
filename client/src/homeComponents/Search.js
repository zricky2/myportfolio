import React, { useRef } from 'react'

export default function Search() {
    const searchBar = useRef()

    async function getStock() {
        const symbol = searchBar.current.value.toUpperCase()
        window.location = `/${symbol}`
    }

    async function getList() {
        const tickerList = await fetch('/tickerlist', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(tickerList)
    }

    getList()
    return (
        <div>
            <label>Type a Stock Ticker</label>
            <input ref={searchBar} input="text" className="search" placeholder="AMD" />
            <button onClick={getStock}>Search</button>
        </div>
    )
}
