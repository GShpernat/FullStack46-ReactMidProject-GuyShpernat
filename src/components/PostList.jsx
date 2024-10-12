import React from 'react';

function PostList({ posts }) {
  return (
    <div className="post-list">
      <h3>Posts - User {posts[0]?.userId}</h3>
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <p><strong>Title:</strong> {post.title}</p>
          <p><strong>Body:</strong> {post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostList;
