import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../actions/postActions';
import { POST_CREATE_RESET } from '../constants/postConstants';
import { Button, Form } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostCreateScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postList = useSelector((state) => state.postList);
  const { posts } = postList;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = postCreate;

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId] = useState(6);

  const createToast = (msg) => toast(msg);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: POST_CREATE_RESET });
      setTitle('');
      setBody('');
      navigate('/');
    }
    // eslint-disable-next-line
  }, [dispatch, navigate, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === '' || body === '') {
      createToast('Please fill the form');
    } else {
      dispatch(
        createPost({
          id: posts.length + 1,
          title,
          body,
          userId: userId + 1,
        })
      );
      createToast('Post successfully created!');
    }
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>

      <ToastContainer />

      <FormContainer>
        <h1>Create Post</h1>
        {loadingCreate ? (
          <Loader />
        ) : errorCreate ? (
          <Message variant='danger'>{errorCreate}</Message>
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
              Submit
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default PostCreateScreen;
