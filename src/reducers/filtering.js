import { SET_FILTER } from '../actions';
import { SHOW_ALL } from '../helpers';

const filtering = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.filter;
    }
    default: {
      return state;
    }
  }
};

export default filtering;
