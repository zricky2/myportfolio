import React, { useState, useRef, useEffect } from 'react';
import '../styles/Search.css';
import stockimg from '../img/stock.jpg';
import 'bulma/css/bulma.css';
import {subreddit} from './redditApi.js';
import { RedditPost } from './redditPost.js';
import watchlistComponent from './watchlistComponent';

export default function Search() {
    const [list, setList] = useState([])
    const searchBar = useRef()
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setList(getList())
    }, [])

    useEffect(() => {
        (async () => {
            const data = await subreddit({
                page: {
                    name: 'wallstreetbets',
                    is_subreddit: true
                }
            });
            const children = data.data.children.map(r => {
                return r.data
            });
            setPosts([children[2], children[3], children[4],  children[5]]);
        })();
    }, [])
    return (
        <div>
                <div className="level-left" id="searchbar">
                <label className="level-item mr-2">Type a Stock Ticker</label>
                <input ref={searchBar} input="text" className="search level-item mr-2" placeholder="Search stock..." />
                <button className="button is-rounded level-item" onClick={getStock}>Search</button>
                </div>
               
                <div className="container">
                    <div className="columns">
                        <div className="column">
                        <img className = 'stockimg' src= {stockimg}></img>
                        {watchlistComponent}
                        </div>
                        <div className="column" id="newsfeed">
                            <p id = "listTitle">r/WallStreetBets Reddit News Feed</p>
                            {
                                posts.map(post => <RedditPost key = {post.id} post={post}/>)
                            }


                        </div>
                    </div>
                </div>
                


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
