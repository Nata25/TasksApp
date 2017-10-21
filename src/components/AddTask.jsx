import React, {Component} from 'react';
import {connect} from 'react-redux';
import id from 'short-id';
import PropTypes from 'prop-types';
import request from 'superagent';
import TaskPreview from './TaskPreview';

import {
  onAddTask,
  onShowPreview,
  preventFormRefresh,
} from '../actions';

import {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_UPLOAD_URL,
} from '../helpers';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      uploadedImgUrl: '',
    };
  }

  componentWillReceiveProps() {
    // focus on first input after preview closing
    if (this.props.previewShowing) {
      this.author.focus();
    }
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
    // if ok, send only data needed for preview
    if (this.state.isFormValid) {
      this.props.showPreviewDispatch(
        this.author.value,
        this.email.value,
        this.text.value,
        this.state.uploadedImgUrl,
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
    this.reset.click();
    this.addButton.focus();
    this.setState({
      isFormValid: false,
      isWarningDisplayed: false,
      uploadedImgUrl: '',
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

  handleImageLoad = () => {
    // prepare data to display in Task preview
    const reader = new FileReader();
    const file = this.image.files[0];
    reader.onload = () => {
      this.setState({
        uploadedImgUrl: reader.result,
      });
    };
    // load image if user added it,
    // clear state if file input was reset
    if (file) reader.readAsDataURL(file);
    else {
      this.setState({
        uploadedImgUrl: '',
      });
    }
  };

  handleFormSubmit = () => {
    const readyData = {
      author: this.author.value,
      email: this.email.value,
      text: this.text.value,
      id: id.generate(),
    };
    // if image was added to form,
    // send it to Cloudinary, get url and supply along with readyData
    if (this.image.files[0]) {
      const upload = request.post(CLOUDINARY_UPLOAD_URL)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', this.image.files[0]);
      upload.end((err, response) => {
        if (err) {
          console.error(err);
        }
        if (response.body.secure_url !== '') {
          this.saveData({
            ...readyData,
            img: response.body.secure_url,
          });
        }
      });
    // if no image, just send spread readyData
    } else this.saveData({ ...readyData });
  };

  saveData(task) {
    const { author, email, text, img, id } = task;
    this.props.addTaskDispatch(author, email, text, img, id);
    this.refreshForm();
  }

  render() {
    return (
      <div>
        <button
          className="add-task-button btn btn-success m-3"
          type="button"
          ref={(item) => {
            this.addButton = item;
          }}
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
          className="collapse border mb-3 p-4"
          id="collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleFormSubmit();
          }}
        >
          <div className="form-group">
            <label htmlFor="userName">Your name:</label>
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
            <label htmlFor="userEmail">Your email:</label>
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
            <label htmlFor="description">Task description:</label>
            <textarea
              id="description"
              placeholder="up to 750 symbols"
              rows={7}
              maxLength={750}
              className="form-control"
              onKeyDown={this.customizeKeyDown}
              ref={(item) => {
                this.text = item;
              }}
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor={`image-${id}`}
              className=""
            >
              You can add an image <small>(optionally)</small>:
            </label>
            <input
              id={`image-${id}`}
              type="file"
              accept="image/png,image/jpeg,image/gif"
              className="form-control-file"
              ref={(item) => {
                this.image = item;
              }}
              onChange={this.handleImageLoad}
            />
          </div>
          <button className="btn btn-outline-success ml-1">
            Add a task
          </button>
          <button
            type="button"
            className="btn btn-outline-info ml-1"
            onClick={(e) => {
              e.preventDefault();
              this.handlePreview();
            }}
          >
            Preview
          </button>
          <button
            className="btn btn-outline-warning ml-1"
            type="reset"
            onClick={() => {
              this.setState({
                isWarningDisplayed: false,
                isFormValid: false,
              });
            }}
            ref={(item) => {
              this.reset = item;
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
