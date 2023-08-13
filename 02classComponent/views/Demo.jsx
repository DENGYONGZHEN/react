import PropTypes from 'prop-types';
import React from 'react';

const Demo = function Demo(props) {
  /**基于React的childre对象对传过来的props中的children进行处理 */
  //console.log(props);
  let { title, children } = props;
  /**
   * 自定义处理非具名slot 插槽
   */
  /*   if (!children) {
    children = [];
  } else if (!Array.isArray(children)) {
    children = [children];
  } */
  //处理非具名slot 插槽
  children = React.Children.toArray(children);

  // const headr = children.filter((item) => item.props.slot === 'header');
  // const footer = children.filter((item) => item.props.slot === 'footer');
  const header = [];
  const footer = [];
  children.forEach((child) => {
    let { slot } = child.props;
    if (slot === 'header') {
      header.push(child);
    } else {
      footer.push(child);
    }
  });
  return (
    <>
      {header}
      <br />
      <h1>{title}</h1>
      <br />
      {footer}
      <br />
    </>
  );
};

Demo.defaultProps = {
  x: 0,
};
Demo.propTypes = {
  title: PropTypes.string.isRequired,
  x: PropTypes.number,
};
export default Demo;

/**
 * 函数组件渲染流程
 *   1. 函数组件的type是function，先调用函数，并把组件中解析的className，style，闭合组件标签中的children
 *    组合成对象props传入函数组件
 *   2. 函数组件接收对应的props，返回虚拟dom，也就是jsx元素，reactDOM中的
 *    render会把虚拟DOM转化为真实DOM进行渲染
 *   3. props是不可以改变的，因为使用的Object.freeze()
 *
 * 通过把函数当成对象，添加私有静态属性，对传进来的props进行校验 */
