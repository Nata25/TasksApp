import React, { Component } from 'react';
import { connect } from 'react-redux';
import id from 'short-id';
import PropTypes from 'prop-types';
import TaskPreview from './TaskPreview';

import {
  onAddTask,
  onShowPreview,
  preventFormRefresh,
} from '../actions';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
    };
  }

  componentDidUpdate() {
    // 'subscribe' for formRefresh value
    // and reset form each time it is set to be true
    if (this.props.formRefresh) {
      this.refreshForm();
      this.props.preventRefresh();
    }
  }

  handlePreview = () => {
    // check form validity before opening preview
    if (this.state.isFormValid) {
      this.props.showPreviewDispatch(
        this.author.value,
        this.email.value,
        this.text.value,
      );
    // display warning message and focus 'wrong' input field
    } else {
      this.setState({
        isWarningDisplayed: true,
      });
      this.focusOnInvalidInput();
    }
  };

  focusOnInvalidInput = () => {
    const inputs = [this.author, this.email, this.text];
    for (let i = 0; i < inputs.length; i += 1) {
      if (!inputs[i].checkValidity()) {
        inputs[i].focus();
        break;
      }
    }
  };

  refreshForm = () => {
    this.author.value = '';
    this.email.value = '';
    this.text.value = '';
    this.addButton.focus();
    this.setState({
      isFormValid: false,
      isWarningDisplayed: false,
    });
  };

  customizeKeyDown = (e) => {
    // linebreak on Shift + Enter, save on Enter
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      if (this.state.isFormValid) this.submitForm();
      else {
        (this.setState({
          isWarningDisplayed: true,
        }));
        this.focusOnInvalidInput();
      }
    }
  };

  submitForm = () => {
    this.props.addTaskDispatch(
      this.author.value,
      this.email.value,
      this.text.value,
      id.generate(),
    );
    this.refreshForm();
  };

  render() {
    return (
      <div>
        <button
          className="add-task-button btn btn-success m-3"
          type="button"
          ref={(item) => { this.addButton = item; }}
          data-toggle="collapse"
          data-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          + Add new Task
        </button>

        <form
          ref={(item) => {
            this.form = item;
          }}
          onChange={() => {
            this.setState({
              isFormValid: this.form.checkValidity(),
              isWarningDisplayed: false,
            });
          }}
          method="post"
          className="collapse border p-4"
          id="collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onSubmit={(e) => {
            e.preventDefault();
            this.submitForm();
          }}
        >
          <div className="form-group">
            <label htmlFor="userName">Your name</label>
            <input
              id="userName"
              className="form-control"
              placeholder="John Doe"
              ref={(item) => {
                this.author = item;
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userEmail">Your email</label>
            <input
              id="userEmail"
              className="form-control"
              type="email"
              placeholder="example@gmail.com"
              ref={(item) => {
                this.email = item;
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Task description</label>
            <textarea
              id="description"
              className="form-control"
              onKeyDown={this.customizeKeyDown}
              ref={(item) => {
                this.text = item;
              }}
              required
            />
          </div>
          <button className="btn btn-outline-success ml-1">
            Add a task
          </button>
          <button
            type="button"
            className="btn btn-outline-info ml-1"
            onClick={this.handlePreview}
          >
            Preview
          </button>
          <button
            className="btn btn-outline-warning ml-1"
            type="reset"
            onClick={() => {
              this.setState({
                isWarningDisplayed: false,
              });
            }}
          >Clear
          </button>
          {this.state.isWarningDisplayed &&
          <small className="text-danger d-block mt-3">
            You should fill all form inputs correctly first!
          </small>
          }
        </form>
        {this.props.previewShowing && <TaskPreview />}
      </div>
    );
  }
}

AddTask.propTypes = {
  addTaskDispatch: PropTypes.func.isRequired,
  showPreviewDispatch: PropTypes.func.isRequired,
  previewShowing: PropTypes.bool.isRequired,
  formRefresh: PropTypes.bool.isRequired,
  preventRefresh: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  previewShowing: state.preview.status,
  formRefresh: state.refresh,
});

const mapDispatchToProps = ({
  addTaskDispatch: onAddTask,
  showPreviewDispatch: onShowPreview,
  preventRefresh: preventFormRefresh,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
