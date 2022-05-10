import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`} className='link-rrd'>
      <ListGroup.Item>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </ListGroup.Item>
    </Link>
  );
};

export default Post;
