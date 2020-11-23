import React, { useState, useEffect } from 'react';
import '../styles/Search.css'
import jwt from 'jwt-decode';

export default function WatchlistComponent() {
    const [list, setList] = useState([]);

    useEffect(() => {
        getList()
    }, [])

    let id = "the _id of each list[i]";
    return (
        <div>
            <p id="listTitle">{userEmail()} Watchlist</p>
            <ul>
                Stock: {list.map(ticker => <ol>{ticker}</ol>)}
                <button value={id} onClick={() => { removeWatch(id) }}>Remove</button>
            </ul>
        </div>
    )

    async function removeWatch(id) {
        try {
            const response = await fetch('/watchlist', {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: { 'Content-Type': 'application/json', 'authorization': `${document.cookie.split("=")[1]}` }
            })
            const data = await response.json();
            console.log(data);
        } catch (err) {
            console.log(err)
            alert("Error: " + err)
        }
    }

    async function getList() {
        try {
            const response = await fetch('/watchlist', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'email': `${jwt(document.cookie).client.email}`, 'authorization': `${document.cookie.split("=")[1]}` }
            })
            let tickerList = await response.json();
            const result = tickerList.map((tic) => tic.ticker);
            setList(result);
        } catch {
            console.log("Error retrieving list");
        }
    }

    function userEmail() {
        try {
            let email = jwt(document.cookie).client.email;
            return email + "'s";
        } catch {
            return "";
        }
    }
};
