import React, { useEffect } from 'react';
import { Button, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listPostDetails, deletePost } from '../actions/postActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post, comments, image } = postDetails;

  const postDelete = useSelector((state) => state.postDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = postDelete;

  const deleteToast = () => toast('Post successfully deleted!');

  useEffect(() => {
    dispatch(listPostDetails(id));
  }, [dispatch, id]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePost(id));
    }
    deleteToast();
    if (successDelete) {
      navigate('/');
    }
  };

  return (
    <>
      <Link className='btn btn-light link-rrd' to='/'>
        Go back
      </Link>

      <ToastContainer />

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <Image src={image.url} alt={post.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{post.title}</h3>
                </ListGroup.Item>
                <ListGroup.Item>{post.body}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <LinkContainer to={`/post/${post.id}/edit`}>
                    <Button variant='light' className='btn'>
                      <i className='fas fa-edit'></i> Edit
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn'
                    onClick={() => deleteHandler(post.id)}
                  >
                    <i className='fas fa-trash'></i> Delete
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col md={9}>
              <h2>
                <i className='fa-solid fa-comments'></i> Comments
              </h2>
              {comments.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant='flush'>
                {comments.map((comment, index) => (
                  <ListGroup.Item key={index}>
                    <p className='text-bold'>
                      <i className='fa-solid fa-user'></i> {comment.email}
                    </p>
                    <p>{comment.body}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PostScreen;
