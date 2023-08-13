import React from 'react';
import PropTypes from 'prop-types';
/**
 *
 * 创建类组件 继承React.Component
 *
 * 类组件第一次渲染的执行流程
 *  1.会先执行constructor创建一个instance
 *  2.然后props规则校验
 *  3.把props挂载到this实例上
 * 
 *     1. 可以自己写constructor
 *           constructor(props) {
                super(props);   把props挂载到this实例上
                console.log(this.props);
             }
       2.即使不写constructor，React会自动把传递的props挂载到this实例上  
       
     4.初始化状态   
 *     需要手动初始化，试图会根据状态的变化进行重新渲染
       state = {
        supNum: 10,
        oppNum: 5,
       };
      5.触发UNSAFE_componentWillMounts生命周期函数(钩子函数)
      6.执行render方法
      7.触发 componentDidMount 此时vitualDOM已经转换为真实DOM
 *


   类组件后续更新视图的执行流程

   通过setState更改状态并更新视图

   1.会执行 shouldComponentUpdate 判断是否要更新 return boolean
   2.执行  UNSAFE_componentWillUpdate 
   3.更新 this.state 为最新的状态值
   4.生成全新的virtualDOM，与上一次生成的virtualDOM进行比对
   5.生成patch，渲染成真实DOM
   6.执行render方法
   7.执行 componentDidUpdate

   通过 forceUpdate 强制更新视图
    会跳过shouldComponentUpdate。从而强制更新


   父组件更新触发子组件更新
   父子组件嵌套，处理机制上遵循深度优先原则：父组件在操作中，遇到子组件，一定是把子组件处理完，父组件才能继续处理：

   第一次渲染
    父willMount-->父 render[ 子willMount-->子 render--> 子 didMount ]--> 父 didMount
   更新
   父 shouldUpdate-->父 willUpdate--> render[

    子componementReceiveProps---> 子 shouldUpdate-->子 willUpdate--> render[] --->子didUpdate] 
    --->父didUpdate

    父组件销毁：

    父willUmount——>处理中[子willUnmount——>子销毁] ——>父销毁


    注意：上面讲的生命周期函数(也就是钩子函数)是要手动添加的，会在适当的阶段自动执行，
    在这些函数中可以写我们自己的处理逻辑，思想上有些类似spring用aop添加切面，在某些方法前后执行相应的逻辑
    如拦截器 interceptor之类的



    继承React.PureComponent
      创建的组件中会自动添加 shouldUpdateComponent,会对state对象中的属性进行浅比较，只会比较第一级
      即使对象内容改变了，会认为不应当更新，


 *
 */

class Vote extends React.Component {
  /*属性规则校验*/
  static defaultProps = {
    SVGAnimatedNumberList: 0,
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number,
  };
  /**初始化状态 */
  state = {
    supNum: 10,
    oppNum: 5,
  };
  /* 
  constructor(props) {
    super();
    // console.log(this.props);
  } */
  render() {
    console.log('渲染');
    let { title } = this.props,
      { supNum, oppNum } = this.state;
    return (
      <div className="vote-box">
        <div className="header">
          <h2 className="title">{title}</h2>
          <span>{supNum + oppNum}</span>
        </div>
        <div className="main">
          <p>支持人数:{supNum}人</p>
          <p>反对人数:{oppNum}人</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              this.setState({
                supNum: ++supNum,
              });
            }}
          >
            支持
          </button>
          <button
            onClick={() => {
              // this.setState({
              //   oppNum: ++oppNum,
              // });
              this.forceUpdate();
            }}
          >
            反对
          </button>
        </div>
      </div>
    );
  }

  UNSAFE_componentWillMount() {
    console.log('UNSAFE_componentWillMount 第一次开始渲染', this.state);
  }
  componentDidMount() {
    console.log('componentDidMount 第一次渲染完毕', this.state);
  }

  shouldComponentUpdate(props, nextState) {
    console.log('shouldComponentUpdate', this.state, nextState);
    return true;
  }
  UNSAFE_componentWillUpdate(props, nextState) {
    console.log('UNSAFE_componentWillUpdate', this.state, nextState);
  }
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  /*  sum=()=>{}      使用 =      这种是加在在私有属性上*/
  /* sum(){}          类似于 sum=function sum(){} 但是这种是加在原型链上，并且不可枚举
  
   sum=function sum(){}  使用 =  都是加在私有属性上

   static sum(){}  加静态方法，直接类名调用 
  
  */
}

export default Vote;
