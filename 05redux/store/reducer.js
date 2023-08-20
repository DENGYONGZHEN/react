import { combineReducers } from 'redux';

/****
 *
 *
 * 工程化
 * 分别创建各模块的reducer
 *
 * 再利用 combineReducers合并为一个reducer ，然后传递给createStore，创建store
 */

const voteReducer = function voteReducer(state = {}, action) {};
const personalReducer = function voteReducer(state = {}, action) {};

export const reducer = combineReducers({
  vote: voteReducer,
  personal: personalReducer,
});
