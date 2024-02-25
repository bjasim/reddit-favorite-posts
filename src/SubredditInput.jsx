/* 
* Filename: SubredditInput.jsx
* Project: AWF Front-end programming Assignment 
* Author: Bakr Jasim
* Date: Feb 24, 2024
* Description: This component represents an input form for users to enter the name of a subreddit. 
*              It allows users to input the subreddit name and submit the form to load posts from 
*              the specified subreddit.
*/

import React, { useState } from 'react';

export default function SubredditInput({ onSubredditChange }) {
  const [subreddit, setSubreddit] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubredditChange(subreddit);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={subreddit} 
        onChange={(e) => setSubreddit(e.target.value)} 
        placeholder="Enter subreddit" 
      />
      <button type="submit">Load Posts</button>
    </form>
  );
}
