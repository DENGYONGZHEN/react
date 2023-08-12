/**对ES6内置API做兼容处理 */
/* import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'; */

import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';
import { render } from './jsxHandler';
import { createElement } from './jsxHandler';

/**需求1，基于数据的值，来判断元素的显示隐藏 */
//let flag = false;
//const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <>
//     {/* 如果直接控制标签，则只会在显示时渲染 */}
//     {flag && <button> have a try</button>}
//     <br />
//     {/* 用display样式控制，不管显示与否，都会被渲染，在网页的元素中可以查看到 */}
//     <button style={{ display: flag ? 'block' : 'none' }}>have a try 2</button>
//   </>
// );

/* fetch('/api/subscriptions/recommended_collections')
  .then((response) => response.json())
  .then((value) => {
    console.log('成功:', value);
  }); */

let x = 10;
let y = 20;

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <div className="container">
//     <h2 className="title" style={{ color: 'red' }}>
//       yes this way
//     </h2>
//     <div className="box">
//       <span>{x}</span>
//       <span>{y}</span>
//     </div>
//   </div>
// );

//调用自定义生成jsx元素方法 生成虚拟DOM
const jsx = createElement(
  'div',
  { className: 'container' },
  createElement(
    'h2',
    { className: 'title', style: { color: 'red' } },
    'yes this way'
  ),
  createElement(
    'div',
    { className: 'box' },
    createElement('span', null, x),
    createElement('span', null, y)
  )
);
console.log(jsx);
render(jsx, document.getElementById('root'));
