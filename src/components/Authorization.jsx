import React from 'react';

const Authorization = () => (
  <div>
    <div className="container-fluid">
      <div className="dropdown row justify-content-end">
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
        <div className="authorization dropdown-menu" aria-labelledby="dropdownMenuButton">
          <form
            className="p-3"
            method="post"
          >
            <div className="form-group">
              <label htmlFor="login">Login</label>
              <input className="form-control" id="login" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input className="form-control" id="password" type="password" />
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Authorization;
