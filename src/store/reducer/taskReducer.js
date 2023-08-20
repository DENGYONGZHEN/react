import * as TYPES from '../action-types';
import _ from '../../assets/utils';

const initial = {
  taskList: null,
};

export default function taskReducer(state = initial, action) {
  state = _.clone(true, state);
  let { taskList } = state;
  switch (action.type) {
    case TYPES.TASK_LIST:
      state.taskList = action.list;
      break;
    case TYPES.TASK_REMOVE:
      if (Array.isArray(taskList)) {
        state.taskList = taskList.filter((task) => +task.id !== +action.id);
      }

      break;
    case TYPES.TASK_UPDATE:
      if (Array.isArray(taskList)) {
        state.taskList = taskList.map((task) => {
          if (+task.id === +action.id) {
            task.state = 2;
            task.complete = new Date().toLocaleString('zh-CN');
          }
          return task;
        });
      }
      break;
    default:
      break;
  }
  return state;
}
