import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/Vote';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import store from './store/index';
import ThemeContext from './ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <ThemeContext.Provider value={{ store }}>
      <Vote />
    </ThemeContext.Provider>
  </ConfigProvider>
);
