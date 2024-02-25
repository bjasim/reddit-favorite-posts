/* 
* Filename: Posts.jsx
* Project: AWF Front-end programming Assignment 
* Author: Bakr Jasim
* Date: Feb 24, 2024
* Description: It displays the post's title, score, and provides a link to the post's comments.
*              Users can also add or remove the post from their favorites using the provided button.
*/

function Post({ post, isFavorite, onToggleFavorite }) {
  return (
    <li>
      <h3>{post.title}</h3>
      <p>Score: {post.score}</p>
      <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">Comments</a>
      <button onClick={() => onToggleFavorite(post.id)}>
        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </li>
  );
}

export default Post;
