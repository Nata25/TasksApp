import mockedTaskList from '../data/mockedTaskList';

export const ADD_TASK = 'ADD_TASK';
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
export const SORT_TASKS = 'SORT_TASKS';
export const GET_TASKS = 'GET_TASKS';
export const SET_FILTER = 'SET_FILTER';
export const SHOW_PREVIEW = 'SHOW_PREVIEW';
export const HIDE_PREVIEW = 'HIDE_PREVIEW';
export const FORM_REFRESH = 'FORM_REFRESH';
export const PREVENT_FORM_REFRESH = 'PREVENT_FORM_REFRESH';

export const onGetTasks = () => ({
  type: GET_TASKS,
  payload: mockedTaskList,
});

export const onAddTask = (author, email, text, id) => ({
  type: ADD_TASK,
  author: encodeURIComponent(author),
  email: encodeURIComponent(email),
  text: encodeURIComponent(text),
  isCompleted: false,
  id,
});

export const onFilterSelected = filter => ({
  type: SET_FILTER,
  filter,
});

export const onSortTasks = key => ({
  type: SORT_TASKS,
  key,
});

export const onStatusChange = (id, isCompleted) => ({
  type: CHANGE_TASK_STATUS,
  id,
  flag: isCompleted,
});

export const onShowPreview = (author, email, text) => ({
  type: SHOW_PREVIEW,
  payload: {
    author,
    email,
    text,
  },
});

export const onHidePreview = ({
  type: HIDE_PREVIEW,
});

export const onFormRefresh = ({
  type: FORM_REFRESH,
});

export const preventFormRefresh = () => ({
  type: PREVENT_FORM_REFRESH,
});
