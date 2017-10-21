import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Task from './Task';
import {
  filterTasks,
  INITIAL_ORDER,
} from '../helpers';

const TaskList = ({ tasks, sorting }) => {
  let key;
  if (sorting === INITIAL_ORDER) {
    key = 'id';
  } else key = sorting.slice(3).toLowerCase();
  const sortingCallback = (item1, item2) => {
    if (item1[key] > item2[key]) return 1;
    return -1;
  };

  return (
    <div>
      <ul className="list-group flex-row justify-content-around row">
        {tasks
          .sort(sortingCallback)
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
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  sorting: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  tasks: filterTasks(state.tasks, state.filtering),
  sorting: state.sorting,
});

export default connect(mapStateToProps, null)(TaskList);
