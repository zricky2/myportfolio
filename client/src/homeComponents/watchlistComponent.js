import React, { useState, useEffect } from 'react';
import '../styles/Search.css'
import jwt from 'jwt-decode';

export default function WatchlistComponent() {
    const [list, setList] = useState(["ricky", "chris"]);
    
    useEffect(() => {
        setList(getList())
        
    }, [])

    return (
        <div>
            <p id = "listTitle">Watchlist</p>
            <p>
                Stock:
               {list[0]}
            </p>
        </div>
    )

    async function getList() {
        try {
            const response = await fetch('/watchlist', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'email':`${jwt(document.cookie).client.email}`, 'authorization': `${document.cookie.split("=")[1]}`}
            })
            let tickerList = await response.json();
           // console.log(tickerList.map((tic) => tic.ticker));
            let ret = await tickerList.map((tic) => tic.ticker);
            return ret;
            ;
        } catch {
            console.log("fail get list");
            return ["fail"];
        }
    }
};
