export const SHOW_ALL = 'SHOW_ALL';
export const COMPLETED = 'COMPLETED';
export const IN_PROGRESS = 'IN_PROGRESS';
export const INITIAL_ORDER = 'INITIAL_ORDER';
export const BY_AUTHOR = 'BY_AUTHOR';
export const BY_EMAIL = 'BY_EMAIL';
export const CLOUDINARY_UPLOAD_PRESET = 'hnjxdi6x';
export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dt3lhiq0m/image/upload';

export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case SHOW_ALL: {
      return tasks;
    }
    case COMPLETED: {
      return tasks.filter(task => task.isCompleted);
    }
    case IN_PROGRESS: {
      return tasks.filter(task => !task.isCompleted);
    }
    default: {
      return tasks;
    }
  }
};
