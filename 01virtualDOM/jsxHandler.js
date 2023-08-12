import React from 'react';
//自定义实现创建虚拟DOM

export const createElement = function createElement(type, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol(React.element),
    type,
    key: null,
    ref: null,
    props: {},
  };
  let length = children.length;
  if (props !== null) virtualDOM.props = { ...props };
  //因为使用了spread语法，就是那三个点，即使只有一个值，也会被转换成数组，所以要判断是否是一个，从数组中取出
  if (length === 1) virtualDOM.props.children = children[0];
  if (length > 1) virtualDOM.props.children = children;
  return virtualDOM;
};

//自定义迭代对象的方法
const each = function each(props, callback) {
  console.log(props);
  const keys = Reflect.ownKeys(props);
  keys.forEach((key) => {
    callback(key, props[key]);
  });
};

//自定义实现virtualDOM转换成真实DOM

export const render = function render(virtual, container) {
  let { type, props } = virtual;

  if (typeof type === 'string') {
    const el = document.createElement(type);

    //迭代props
    each(props, (key, value) => {
      //class的情况
      if (key === 'className') {
        el.setAttribute('class', value);
        return;
      }
      //style的情况
      if (key === 'style') {
        each(value, (val, attr) => {
          el.style[val] = attr;
        });
        return;
      }
      //children的情况
      if (key === 'children') {
        let children = value;
        //如果不是数组，把他包装成数组
        if (!Array.isArray(children)) children = [children];

        children.forEach((item) => {
          if (/^(string|number)$/.test(typeof item)) {
            el.appendChild(document.createTextNode(item));
            return;
          }
          render(item, el);
        });
        return;
      }
      el.setAttribute(key, value);
    });
    container.appendChild(el);
  }
};
