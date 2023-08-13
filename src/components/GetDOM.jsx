/**
 *
 * 获取DOM
 */

import React from 'react';

class GetDOM extends React.Component {
  ref3 = React.createRef();
  render() {
    return (
      <>
        <h1 ref="ref1">注意1</h1>
        <br />
        <h1 ref={(x) => (this.ref2 = x)}>注意2</h1>
        <br />
        <h1 ref={this.ref3}>注意3</h1>
        <br />
      </>
    );
  }

  componentDidMount() {
    /** 当元素属性 ref的值是字符串时，会把字符串作为key，元素为值的对象挂载到this 的refs属性上
     * 不推荐使用
     */
    console.log(this.refs.ref1);
    /** 当元素属性 ref的值是函数时，会把元素作为实参传入，并执行函数，把元素挂载到this实例上 */
    console.log(this.ref2);
    /** 当用React.createRef()创建的ref3是元素属性 ref的值时，会把dom元素挂载到this.refs.current上 */
    console.log(this.ref3.current);
  }
}

export default GetDOM;
