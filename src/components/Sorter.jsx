import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onSortTasks } from '../actions';

const Sorter = ({ param, sorting, applySort }) => (
  <button
    onClick={applySort}
    type="button"
    className="btn btn-sm btn-outline-primary ml-1"
    disabled={param === sorting}
  >
    {param.toLowerCase().replace('_', ' ')}
  </button>
);

Sorter.propTypes = {
  applySort: PropTypes.func.isRequired,
  param: PropTypes.string.isRequired,
  sorting: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch, props) => ({
  applySort() {
    dispatch(onSortTasks(props.param));
  },
});

const mapStateToProps = state => ({
  sorting: state.sorting,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sorter);
