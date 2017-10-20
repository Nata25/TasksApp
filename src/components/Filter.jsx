import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { onFilterSelected } from '../actions';

const Filter = (props) => {
  if (props.filter === props.ownFilter) {
    return (<button
      className="btn btn-sm btn-outline-info ml-1"
      disabled
    >
      {props.children}
    </button>);
  }
  return (
    <button
      type="button"
      className="btn btn-sm btn-outline-info ml-1"
      onClick={() => {
        props.onFilterSelected();
      }}
    >
      {props.children}
    </button>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  ownFilter: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string]).isRequired,
  onFilterSelected: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  filter: state.filtering,
  ownFilter: ownProps.filter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFilterSelected: () => {
    dispatch(onFilterSelected(ownProps.filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
