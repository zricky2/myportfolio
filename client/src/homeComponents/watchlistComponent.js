import React, { useState, useEffect } from 'react';
import '../styles/Search.css'
import jwt from 'jwt-decode';

export default function WatchlistComponent() {
    const [list, setList] = useState([]);
    useEffect(() => {
        getList()
    }, [])

    return (
        <div>
            <p id="listTitle">{userEmail()} Watchlist</p>
            <ul>
               {list.map(tic =>  <div className="removeButton"> <li id="stockTicker">{tic.ticker}</li> <button onClick={() => { removeWatch(tic._id) }}>Remove</button></div>)}
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
            getList();
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
            const result = tickerList;
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
