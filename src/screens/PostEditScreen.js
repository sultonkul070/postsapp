import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../actions/postActions';
import { POST_UPDATE_RESET } from '../constants/postConstants';
import { listPostDetails } from '../actions/postActions';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostEditScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: postId } = useParams();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;

  const postUpdate = useSelector((state) => state.postUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = postUpdate;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const updateToast = () => toast('Post successfully updated!');

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: POST_UPDATE_RESET });
      navigate('/');
    } else {
      if (!post.title || post.id !== postId) {
        dispatch(listPostDetails(postId));
      } else {
        setTitle(post.title);
        setBody(post.body);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, navigate, postId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        id: postId,
        title,
        body,
        userId: post.userId,
      })
    );
    updateToast();
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      <ToastContainer />

      <FormContainer>
        <h1>Edit Post</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='title' className='pb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='body' className='pb-5'>
              <Form.Label>Body</Form.Label>
              <Form.Control
                as='textarea'
                rows={5}
                placeholder='Enter Body'
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type='submit'
              variant='primary'
              className='btn btn-block w-100'
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PostEditScreen;
