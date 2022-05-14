import React from 'react';
import moment from 'moment';

export default function Posts({ post }) {

  return (
    <div className='club-post'>
      <div className='post-header'>
        <div className='username'>
          Message by <span>{post.userId}</span>
        </div>
        <div className='post-date'>
        { post.postDate?
        moment.unix(post.postDate.seconds).format('LLLL')
        : moment(post.postDate).format('LLLL') }
        </div>
      </div>
      <div className='post-body'>
        <div className='userImg'>
          <img src={post.posterUserImg} alt='userImage' />
        </div>
        <div className='user-post'>
          <p className='post-detail'> {post.postBody}</p>
        </div>
      </div>
    </div>
  );
}
