import React, { useEffect, useState } from 'react';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createPost, listPosts } from '../actions/postActions';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Post from '../components/Post';
import { POST_CREATE_RESET } from '../constants/postConstants';

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [createdPost, setCreatedPost] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const postList = useSelector((state) => state.postList);
  const { loading, error, posts } = postList;

  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    post,
  } = postCreate;

  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET });

    if (successCreate) {
      navigate(`/post/${post.id}/edit`);
    } else {
      dispatch(listPosts(keyword));
    }
  }, [post, dispatch, navigate, successCreate, keyword]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Latest posts</h1>
        </Col>
        <Col
          className='text-right'
          style={{ display: 'flex', justifyContent: 'end' }}
        >
          <Link to='/create' className='link-rrd'>
            <Button className='my-3'>
              <i className='fas fa-plus'></i> Create Post
            </Button>
          </Link>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <ListGroup>
            {currentPosts.map((post, index) => (
              <Post post={post} key={index} />
            ))}
          </ListGroup>
          <Paginate
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            scrollToTop={scrollToTop}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
