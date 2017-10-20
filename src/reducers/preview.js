import { combineReducers } from 'redux';
import { SHOW_PREVIEW, HIDE_PREVIEW } from '../actions';

const data = (state = {}, action) => {
  switch (action.type) {
    case SHOW_PREVIEW: {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
};

const status = (state = false, action) => {
  switch (action.type) {
    case SHOW_PREVIEW: {
      return true;
    }
    case HIDE_PREVIEW: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  status,
  data,
});
