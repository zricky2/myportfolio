import React, { useState, useRef, useEffect } from 'react'

export default function Search() {
    const [list, setList] = useState([])
    const searchBar = useRef()

    useEffect(() => {
        setList(getList())
    }, [])

    return (
        <div>
            <label>Type a Stock Ticker</label>
            <input ref={searchBar} input="text" className="search" placeholder="AMD" />
            <button onClick={getStock}>Search</button>
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
