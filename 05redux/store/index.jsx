import { createStore } from './myStore';

// import { createStore } from 'redux';

/**
 * 修改Store容器中的公共状态
 */
let initial = {
  supNum: 10,
  oppNum: 5,
};
const reducer = function reducer(state = initial, action) {
  //state:存储STORE容器中的公共状态（最开始没有的时候，赋值初始状态值initial）
  //action:每一次基于dispatch派发的时候，传递进来的行为对象（要求必须具备type属性，存储派发的行为标识）
  //基于派发的action.type,修改STORE容器中的公共状态信息
  state = { ...state };
  switch (action.type) {
    case 'VOTE_ SUP':
      state.supNum++;
      break;
    case 'VOTE_OPP':
      state.oppNum++;
      break;
    default:
      break;
  }
  //return的内容，会整体替换STORE容器中的内容
  console.log(state);
  return state;
};

/**
 * 创建Store 公共容器
 */
const store = createStore(reducer);

// store.dispatch({
//   type: 'VOTE_ SUP',
//   step: 10,
// });

export default store;
