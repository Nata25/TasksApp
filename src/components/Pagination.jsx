import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import id from 'short-id';
import { onPaginationClick } from '../actions';

const Pagination = ({ totalPages, currentPage, navigate }) => {
  // based on total pages number, generate array which will be mapped in render()
  const pages = [];
  for (let i = 0; i < totalPages; i += 1) {
    pages.push(i + 1);
  }
  return (
    <div>
      <nav aria-label="Page navigation" className="mt-3 d-flex row justify-content-center">
        <ul className="pagination">
          {pages.map(
            (page) => {
              // decide if current item is active
              const classModifier = page === currentPage ? 'active' : '';
              return (
                <li
                  key={id.generate()}
                  className={`page-item ${classModifier}`}
                >
                  <Link
                    to={`/${page}`}
                    className="page-link"
                    onClick={() => {
                      navigate(page);
                    }}
                  >
                    {page}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </nav>
    </div>
  );
};

const mapDispatchToProps = ({
  navigate: onPaginationClick,
});

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  navigate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default connect(
  state => ({
    totalPages: Math.ceil(state.tasks.length / 3),
    currentPage: state.page,
  }),
  mapDispatchToProps)(Pagination);
