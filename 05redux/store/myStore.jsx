import _ from '../assets/utils';
export const createStore = function createStore(reducer) {
  let state;
  let subList = [];

  //获取state的方法
  const getState = () => {
    return _.clone(true, state);
  };
  const dispatch = (action) => {
    state = reducer(state, action);
    subList.forEach((item) => {
      item();
    });
    return action;
  };
  const subscribe = (func) => {
    if (!subList.includes(func)) {
      subList.push(func);
    }
    return function unsubscribe(func) {
      subList = subList.filter((item) => item !== func);
    };
  };

  dispatch({
    type:
      '@@redux/INIT' +
      Math.random().toString(36).substring(7).split('').join('.'),
  });

  return {
    getState,
    subscribe,
    dispatch,
  };
};
