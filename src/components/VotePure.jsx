/**
 * 继承React.PureComponent组件创建列组件
 *
 */

import React from 'react';

/**
 * 对象的浅比较
 */
const isObj = (obj) => {
  return obj !== null && /^(object|function)$/.test(typeof obj);
};

const isEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;
  if (!isObj(obj1) || !isObj(obj2)) return false;
  let keys1 = Reflect.ownKeys(obj1);
  let keys2 = Reflect.ownKeys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (let i = 0; i < keys1.length; i++) {
    let key = keys1[i];
    if (!obj2.hasOwnProperty(key) || !Object.is(obj1[key], obj2[key]))
      return false;
  }
  return true;
};

class VotePure extends React.PureComponent {
  state = {
    arr: [1, 2, 3],
  };

  render() {
    let { arr } = this.state;
    return (
      <div className="vote-box">
        {arr.map((item, index) => (
          <h3
            key={index}
            style={{
              display: 'inline-block',
              backgroundColor: 'orange',
              margin: 20,
            }}
          >
            {item}
          </h3>
        ))}
        <button
          onClick={() => {
            /*            
             因为在继承PureComponent实现的类组件中，会自动添加shouldUpdateComponent
             在这个函数中，会对props和state进行浅比较，所以下面这样不会更新视图
             arr.push(4); */
            arr.push(4);
            this.setState({ arr: [...arr] });
          }}
        >
          增加
        </button>
      </div>
    );
  }
  /*   shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  } */
}

export default VotePure;
