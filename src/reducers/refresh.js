import { FORM_REFRESH, PREVENT_FORM_REFRESH } from '../actions';

export default function (state = false, action) {
  switch (action.type) {
    case FORM_REFRESH: {
      return true;
    }
    case PREVENT_FORM_REFRESH: {
      return false;
    }
    default: {
      return state;
    }
  }
}
