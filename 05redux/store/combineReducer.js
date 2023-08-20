/***
 *
 * 传入参数 reducers
 * {
 *  vote:voteReducer,
 *  personal:personalReducer
 * }
 */
export default function combineReducer(reducers) {
  let inital = {};

  const keys = Reflect.ownKeys(reducers);

  return function reducer(state = inital, action) {
    let nextState = {};
    keys.forEach((key) => {
      nextState[key] = reducers[key](state[key], action);
    });
    return nextState;
  };
}
