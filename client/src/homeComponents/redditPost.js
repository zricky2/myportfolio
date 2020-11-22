import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Search.css'
RedditPost.propTypes = {
    post: PropTypes.object
};

export function RedditPost(props) {
    const {title} = props.post;
    let {thumbnail} = props.post;
    if (thumbnail === 'self') {
        return (
            <div className="card" id="reddit">
                <p>{title}</p>
            </div>
    
        )
    }
    return (
        <div className="card" id="reddit">
            <p>{title}</p>
            <img src={thumbnail}></img>
        </div>

    )
};

export default RedditPost;