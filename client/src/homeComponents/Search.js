import React, { useState, useRef, useEffect } from "react";
import "../styles/Search.css";
import stockimg from "../img/stock.jpg";
import "bulma/css/bulma.css";
import { subreddit } from "./redditApi.js";
import { RedditPost } from "./redditPost.js";
import WatchlistComponent from "./watchlistComponent";
import { Dropdown } from "./Dropdown";

export default function Search() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await subreddit({
        page: {
          name: "wallstreetbets",
          is_subreddit: true,
        },
      });
      const children = data.data.children.map((r) => {
        return r.data;
      });
      setPosts([children[2], children[3], children[4], children[5]]);
    })();
  }, []);

  return (
    <div>
      <Dropdown />

      <div className="container">
        <div className="columns">
          <div className="column">
            <img className="stockimg" src={stockimg}></img>
            {<WatchlistComponent />}
          </div>
          <div className="column" id="newsfeed">
            <p id="listTitle">r/WallStreetBets Reddit News Feed</p>
            {posts.map((post) => (
              <RedditPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  async function getList() {
    const response = await fetch("/index", {
      headers: { "Content-Type": "application/json" },
    });
    const tickerList = await response.json();
    return tickerList;
  }
}
