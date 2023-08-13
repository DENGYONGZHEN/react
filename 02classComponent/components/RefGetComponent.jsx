/** ref 获取自定义组件 
 * 
 *  
 * ref 可以获取类组件的实例对象






*/
import React from 'react';
import { forwardRef } from 'react';

class Child1 extends React.Component {
  render() {
    return (
      <div className="child">
        child1
        <button ref={(x) => (this.button = x)}></button>
      </div>
    );
  }
}

//通过 forwardRef 转发获取函数组件中的dom
const Child2 = forwardRef((props, ref) => {
  console.log(ref);
  return (
    <div className="child2">
      <button ref={ref}>child2</button>
    </div>
  );
});

class RefGetComponent extends React.Component {
  ref3 = React.createRef();
  render() {
    return (
      <>
        <Child1 ref={(x) => (this.child1 = x)} />
        <Child2 ref={(x) => (this.child2 = x)} />
      </>
    );
  }

  componentDidMount() {
    console.log(this.child1);
    console.log(this.child2);
  }
}

export default RefGetComponent;
