import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>学习，赚钱 </div>
    
);

fetch('/api/subscriptions/recommended_collections')
  .then(response => response.json())
  .then(value => {
    console.log('成功:', value);
  });




