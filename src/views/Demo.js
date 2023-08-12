const Demo = function Demo(props) {
  console.log(props);
  return <h1>{props.title}</h1>;
};

Demo.defaultProps = {
  x: 0,
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
