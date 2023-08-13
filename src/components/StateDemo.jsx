import React from 'react';

/**
 *
 *
 * this.setState(partialState,callback)
 *
 * partialState是部分state，state是一个对象，可以指传入要修改的state的属性
 * callback 正常是在 componentDidUpdated后执行，只要传入callback就一定会执行
 */

class StateDemo extends React.Component {
  state = {
    x: 10,
    y: 30,
    z: 50,
  };

  handler = () => {
    this.setState({ x: 100 }, () => {
      console.log('setState的callback函数');
    });
  };

  render() {
    let { x, y, z } = this.state;
    return (
      <>
        <h1>
          {x}--{y}--{z}
        </h1>
        <button onClick={this.handler}>try</button>
      </>
    );
  }
  shouldComponentUpdate() {
    return false;
  }
  componentDidUpdate() {
    console.log('componentDidUpdate.....');
  }
}

export default StateDemo;
