import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
  scrollToTop,
  keyword = '',
}) => {
  const pages = Math.ceil(totalPosts / postsPerPage);

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
          >
            <Pagination.Item
              active={x + 1 === currentPage}
              onClick={() => {
                paginate(x + 1);
                scrollToTop();
              }}
            >
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
