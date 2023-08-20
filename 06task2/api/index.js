import http from './http';

export const getTaskList = (state = 0) => {
  return http.get('/getTaskList', {
    params: {
      state,
    },
  });
};
export const postTask = (task, time) => {
  return http.post('/addTask', { task, time });
};
export const patchTaskList = (id) => {
  return http.get('/completeTask', {
    params: {
      id,
    },
  });
};
export const deleteTask = (id) => {
  return http.get('/removeTask', {
    params: {
      id,
    },
  });
};
