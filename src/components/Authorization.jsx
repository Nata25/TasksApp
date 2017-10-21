import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
  onLogin,
  onLogout,
} from '../actions/';

class Authorization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isWarningDisplayed: false,
    };
  }

  validateInput = (lg, pw) =>
    decodeURIComponent(encodeURIComponent(lg)) === 'admin'
      && decodeURIComponent(encodeURIComponent(pw)) === '123';

  render() {
    const { isLoggedIn, logIn, logOut } = this.props;

    return (
      <div>
        <div className="container-fluid row justify-content-end">
          {!isLoggedIn && <div className="dropdown">
            <button
              className="btn btn-secondary btn-info dropdown-toggle m-2"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup
              aria-expanded="false"
            >
              Authorization
            </button>
            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButton"
            >
              <form
                className="p-3"
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (this.validateInput(this.login.value, this.password.value)) logIn();
                  else {
                    this.setState({
                      isWarningDisplayed: true,
                    });
                  }
                  this.login.focus();
                }}
                onChange={() => {
                  this.setState({
                    isWarningDisplayed: false,
                  });
                }}
              >
                <div className="form-group">
                  <label htmlFor="login">Login</label>
                  <input
                    className="form-control"
                    ref={(item) => { this.login = item; }}
                    id="login"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    ref={(item) => { this.password = item; }}
                    id="password"
                    type="password"
                  />
                </div>
                {this.state.isWarningDisplayed &&
                <small className="text-danger d-block m-3">
                  Incorrect input!
                </small>}
                <button className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>}
          {isLoggedIn && <button
            className="btn btn-secondary btn-info m-2 float-r"
            onClick={logOut}
          >Log Out</button>}
        </div>
      </div>
    );
  }
}

Authorization.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: state.login,
});

const mapDispatchToProps = ({
  logIn: onLogin,
  logOut: onLogout,
});

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);
