import ThemeContext from '../ThemeContext';
import { useContext, useState, useEffect } from 'react';

export default function VoteMain() {
  const { store } = useContext(ThemeContext);
  let { supNum, oppNum } = store.getState();
  // 把让组件更新的办法加入到事件池中
  let [_, setRandom] = useState(0);
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setRandom(+new Date());
    });
    // unsubscribe() 可以把刚才注入到事件池中的方法移除
  }, []);
  return (
    <div className="main">
      <div className="sup">支持人数:{supNum}</div>
      <div className="opp">反对人数:{oppNum}</div>
    </div>
  );
}
