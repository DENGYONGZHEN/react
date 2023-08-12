import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';
import Demo from '@/views/Demo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Demo className="box" title="function component" x={10}>
      <span>{10}</span>
      <span>{20}</span>
    </Demo>
    <Demo title="function component"></Demo>
  </>
);
