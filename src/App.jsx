import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import Authorization from './components/Authorization';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Sorter from './components/Sorter';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import Footer from './components/Footer';
import { onGetTasks } from './actions';
import {
  BY_AUTHOR,
  BY_EMAIL,
  INITIAL_ORDER,
} from './helpers/';

import './components/TaskPreview/styles.css';

class App extends Component {
  static propTypes = {
    getTasks: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getTasks();
  }

  render() {
    return (
      <div>
        <Authorization />
        <section className="container">
          <h1 className="mb-5 text-center">Tasks List App
            <small className="d-block">React+Redux</small>
          </h1>
          <p>
            Sort:
            <Sorter param={BY_AUTHOR} />
            <Sorter param={BY_EMAIL} />
            <Sorter param={INITIAL_ORDER} />
          </p>
          <Filters />
          <AddTask />
          <Switch>
            <Route exact path="/" component={TaskList} />
            <Route path="/:number" component={TaskList} />
          </Switch>
          <Pagination />
        </section>
        <Footer />
      </div>
    );
  }
}

export default connect(null, {
  getTasks: onGetTasks,
})(App);

