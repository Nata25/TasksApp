import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import id from 'short-id';
import Task from '../Task/Task';
import {
  onAddTask,
  onHidePreview,
  onFormRefresh,
} from '../../actions/index';

const TaskPreview = props => (
  <div className="preview-modal">
    <div className="preview-modal__body">
      <Task task={props.task} />
      <div
        className="preview-modal__buttons d-flex"
        onKeyDown={(e) => {
          if (e.keyCode === 27) props.onHidePreview();
        }}
      >
        <button
          className="btn btn-primary mt-4 mr-3 float-right"
          onClick={() => {
            const taskID = id.generate();
            console.log(taskID);
            props.addTaskDispatch(
              props.task.author,
              props.task.email,
              props.task.text,
              props.task.img,
              taskID);
            props.onHidePreview();
            props.onFormRefresh();
          }}
          autoFocus
        >Save
        </button>
        <button
          className="btn btn-primary ml-1 mt-4 float-right"
          onClick={() => {
            props.onHidePreview();
          }}
        >Edit
        </button>
      </div>
    </div>
  </div>
);

TaskPreview.propTypes = {
  addTaskDispatch: PropTypes.func.isRequired,
  onHidePreview: PropTypes.func.isRequired,
  onFormRefresh: PropTypes.func.isRequired,
  task: PropTypes.shape(),
};

TaskPreview.defaultProps = {
  task: {
    author: '',
    email: '',
    text: '',
  },
};

const mapStateToProps = state => ({
  previewShowing: state.preview.status,
  task: state.preview.data,
});

const mapDispatchToProps = ({
  onHidePreview,
  addTaskDispatch: onAddTask,
  onFormRefresh,
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskPreview);
