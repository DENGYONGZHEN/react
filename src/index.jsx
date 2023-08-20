import React from 'react';
import ReactDOM from 'react-dom/client';
import Task from './views/Task';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import store from './store/index';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Task />
    </Provider>
  </ConfigProvider>
);
