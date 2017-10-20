import { combineReducers } from 'redux';
import tasks from './tasks';
import sorting from './sorting';
import filtering from './filtering';
import preview from './preview';
import refresh from './refresh';

const rootReducer = combineReducers({
  tasks,
  sorting,
  filtering,
  preview,
  refresh,
});

export default rootReducer;

