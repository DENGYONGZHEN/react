import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less';
// import Demo from '@/views/Demo';
// import Dialog from './components/Dialog';
// import Vote from './components/Vote';
// import VotePure from './components/VotePure';
// import GetDOM from './components/GetDOM';
import RefGetComponent from './components/RefGetComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*   <>
    <Demo className="box" title="function component" x={10}>
      <span slot="footer">footer</span>
      <span slot="header">header</span>
    </Demo>

    <Demo className="box" title="function component" x={10}>
      <span slot="footer">header</span>
    </Demo>
    <Demo title="function component"></Demo>
  </> */

  /*   <>
    <Dialog title="友情提示" content="一定要好好学习" />
    <Dialog content="健康身体">
      <button>确定</button>
      <button>取消</button>
    </Dialog>
  </> */
  // <Vote title="投票" num={15} />
  // <VotePure />
  // <GetDOM />
  <RefGetComponent />
);
