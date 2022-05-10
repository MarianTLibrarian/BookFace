import React, { useState, useEffect } from 'react';

export default function Posts({ post }) {

  return (
    <div className='club-post'>
      <div className='post-header'>
        <div className='username'>
          Message {post.post_id} by <span>{post.poster_name}</span>
        </div>
        <div className='post-date'>
          {post.post_date}
        </div>
      </div>
      <div className='post-body'>
        <div className='userImg'>
          <img src={post.posterUserImg} alt='userImage' />
        </div>
        <div className='user-post'>
          <p> {post.post_body}</p>
        </div>
      </div>
    </div>
  );
}
