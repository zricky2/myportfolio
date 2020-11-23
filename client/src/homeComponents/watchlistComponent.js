import React, { useState, useEffect } from 'react';
import '../styles/Search.css'
import jwt from 'jwt-decode';

export default function WatchlistComponent() {
    const [list, setList] = useState(["ricky", "chris"]);
    let email;
    useEffect(() => {
        setList(getList())
        
    }, [])
    try{
        email = jwt(document.cookie).client.email;
        email = email + "'s";
    } catch {
        email = "";
    }
    let id = "the _id of each list[i]";
    return (
        <div>
            <p id = "listTitle">{email} Watchlist</p>
            <p>
                Stock:
               {list[0]}
               <button value={id} onClick={() => {removeWatch(id)}}>Remove</button>
            </p>
        </div>
    )

    async function removeWatch(id) {
        try {
            const response = await fetch('/watchlist', {
                method: 'DELETE', 
                body: JSON.stringify({ id: id}),
                headers: { 'Content-Type': 'application/json', 'authorization': `${document.cookie.split("=")[1]}`}
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
                headers: { 'Content-Type': 'application/json', 'email':`${jwt(document.cookie).client.email}`, 'authorization': `${document.cookie.split("=")[1]}`}
            })
            let tickerList = await response.json();
           // console.log(tickerList.map((tic) => tic.ticker));
            let ret = await tickerList.map((tic) => tic.ticker);
            console.log(ret);
            return ret;
            ;
        } catch {
            console.log("fail get list");
            return ["fail"];
        }
    }
};
