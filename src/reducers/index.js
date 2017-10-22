import { combineReducers } from 'redux';
import tasks from './tasks';
import sorting from './sorting';
import filtering from './filtering';
import preview from './preview';
import refresh from './refresh';
import login from './login';
import page from './page';

const rootReducer = combineReducers({
  tasks,
  sorting,
  filtering,
  preview,
  refresh,
  login,
  page,
});

export default rootReducer;

