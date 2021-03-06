import { GET_PAGE } from '../actions';

const pagination = (state = 1, action) => {
  switch (action.type) {
    case GET_PAGE: {
      return action.page;
    }
    default: {
      return state;
    }
  }
};

export default pagination;
