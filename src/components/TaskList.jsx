import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Task from './Task/Task';
import {
  filterTasks,
  INITIAL_ORDER,
} from '../helpers';

class TaskList extends Component {
  render() {
    const { tasks, sorting, page } = this.props;

    // prepare for sorting Tasks in render
    let key;
    // assume tasks initially are sorter by id
    if (sorting === INITIAL_ORDER) {
      key = 'id';
      // if there's a sorting param, use it to address corresponding field in Task
      // BY_NAME => name => task.name
    } else key = sorting.slice(3).toLowerCase();
    const sortingCallback = (item1, item2) => {
      if (item1[key] > item2[key]) return 1;
      return -1;
    };

    const end = page * 3;
    const start = end - 3;

    return (
      <div>
        <ul className="list-group flex-row justify-content-center row">
          {tasks
            .sort(sortingCallback)
            .slice(start, end)
            .map(
              task =>
                (<li
                  key={task.id}
                  className="list-group-item col-md-8 col-lg-4"
                >
                  <Task
                    id={task.id}
                  />
                </li>),
            )}
        </ul>
      </div>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  sorting: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};


const mapStateToProps = state => ({
  tasks: filterTasks(state.tasks, state.filtering),
  sorting: state.sorting,
  page: state.page,
});

export default connect(mapStateToProps, null)(TaskList);
