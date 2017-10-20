import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { onStatusChange } from '../actions';

const Task = (props) => {
  const {
    id,
    author,
    email,
    text,
    isCompleted,
  } = props.task;
  const status = isCompleted ? 'completed' : 'in progress';
  const colorIndicatorClass = isCompleted ? 'text-success' : 'text-warning';
  const label = isCompleted ? 'Mark as incomplete' : 'Mark as complete';
  let statusCheckbox;
  return (
    <article>
      <img src="" className="card-img-top" />
      <div className="card-body border">
        <p className="card-text">{decodeURIComponent(text)}</p>
        <small className="font-weight-light d-block">Author:
          <span className="text-info ml-1">{decodeURIComponent(author)}</span>
        </small>
        <small className="font-weight-light d-block mt-2">Email:
          <a
            className="ml-1"
            href={`mailto:${decodeURIComponent(email)}`}
            target="_blank"
          >{decodeURIComponent(email)}</a>
        </small>

        <p className="font-weight-light mt-3">Status:
          <span className={`ml-1 ${colorIndicatorClass}`}>{status}</span>
        </p>
        { props.isLabelShowing && <label
          htmlFor={`completion-${id}`}
          className="form-check-label font-weight-light"
        >
          <input
            className="form-check form-check-input"
            id={`completion-${id}`}
            type="checkbox"
            checked={isCompleted}
            ref={(item) => {
              statusCheckbox = item;
            }}
            onChange={() => {
              props.onStatusChange(id, statusCheckbox.checked);
            }}
          />
          {label}
        </label> }
      </div>
    </article>
  );
};

Task.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  task: PropTypes.shape(),
  isLabelShowing: PropTypes.bool.isRequired,
};

Task.defaultProps = {
  task: {
    id: null,
    author: '',
    email: '',
    text: '',
    isCompleted: false,
  },
};

const mapStateToProps = (state, props) => {
  let resultProps = {};
  const taskFromList = state.tasks.find(task => task.id === props.id);
  if (taskFromList) {
    resultProps = { task: taskFromList };
  }
  return {
    ...resultProps,
    isLabelShowing: !state.preview.status,
  };
};

const mapDispatchToProps = ({
  onStatusChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
