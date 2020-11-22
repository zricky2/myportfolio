import React, { useState, useEffect } from 'react';
import '../styles/Search.css'
import jwt from 'jwt-decode';

export default function watchlistComponent() {
    const [list, setList] = useState([]);
    useEffect(() => {
        setList(getList())
    }, [])
    return (
        <div>
            <p id = "listTitle">Watchlist</p>
            <p>{list}</p>
        </div>
    )
    async function getList() {
        const response = await fetch('/waitlist', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'email':`${jwt(document.cookie).client.email}`, 'authorization': `${document.cookie.split("=")[1]}`}
        })
        const tickerList = await response.json()
        return tickerList.ticker;
    }
}
