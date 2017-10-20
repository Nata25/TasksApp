import {
  ADD_TASK,
  GET_TASKS,
  CHANGE_TASK_STATUS,
} from '../actions';

const singleTaskReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK: {
      return {
        author: action.author,
        email: action.email,
        text: action.text,
        id: action.id,
        isCompleted: false,
      };
    }
    case CHANGE_TASK_STATUS: {
      if (state.id !== action.id) return state;
      return {
        ...state,
        isCompleted: action.flag,
      };
    }
    default: {
      return state;
    }
  }
};

const taskListReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TASKS: {
      return action.payload;
    }
    case ADD_TASK: {
      return [...state, singleTaskReducer(state, action)];
    }
    case CHANGE_TASK_STATUS: {
      return state.map(task => singleTaskReducer(task, action));
    }
    default: {
      return state;
    }
  }
};

export default taskListReducer;
