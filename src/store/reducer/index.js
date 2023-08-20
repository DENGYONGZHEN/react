import { combineReducers } from 'redux';

import taskReducer from './taskReducer';

export const reducer = combineReducers({
  task: taskReducer,
});
