import { SORT_TASKS } from '../actions';
import { INITIAL_ORDER } from '../helpers';

export default function (state = INITIAL_ORDER, action) {
  switch (action.type) {
    case SORT_TASKS: {
      return action.key;
    }
    default: {
      return state;
    }
  }
}
