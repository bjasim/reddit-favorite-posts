/* 
* Filename: App.jsx
* Project: AWF Front-end programming Assignment 
* Author: Bakr Jasim
* Date: Feb 24, 2024
* Description: This file contains the main application component responsible for rendering subreddit 
* posts and handling user interactions, such as toggling favorites and fetching data from the Reddit API.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubredditInput from './SubredditInput';
import Post from './Post';

export default function App() {
  const [subreddit, setSubreddit] = useState('reactjs');
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`)
      .then((response) => {
        const newPosts = response.data.data.children.map(
          (child) => child.data
        );
        setPosts(newPosts);
      })
      .catch((error) => {
        console.error('Error fetching subreddit posts: ', error);
      });
  }, [subreddit]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavoritePosts();
  }, [favorites]);

  const loadFavoritePosts = async () => {
    const loadedFavoritePosts = [];
    for (const postId of favorites) {
      try {
        const response = await axios.get(`https://www.reddit.com/by_id/t3_${postId}.json`);
        loadedFavoritePosts.push(response.data.data.children[0].data);
      } catch (error) {
        console.error('Error fetching favorite post: ', error);
      }
    }
    setFavoritePosts(loadedFavoritePosts);
  };

  const handleToggleFavorite = (postId) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(postId)) {
        return currentFavorites.filter((favId) => favId !== postId);
      } else {
        return [...currentFavorites, postId];
      }
    });
  };

  return (
    <div>
      <SubredditInput onSubredditChange={setSubreddit} />
      <h2>Subreddit Posts</h2>
      <ul>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            isFavorite={favorites.includes(post.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </ul>
      <h2>All Favorite Posts</h2>
      <ul>
        {favoritePosts.map((post) => (
          <Post
            key={post.id}
            post={post}
            isFavorite={true}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </ul>
    </div>
  );
}

