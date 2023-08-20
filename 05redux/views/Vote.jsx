import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import { useContext, useEffect, useState } from 'react';
import ThemeContext from '../ThemeContext';
export default function Vote() {
  const { store } = useContext(ThemeContext);
  let { supNum, oppNum } = store.getState();
  const [num, setNum] = useState(0);
  const update = () => {
    setNum(num + 1);
  };
  useEffect(() => {
    let unsubscribe = store.subscribe(update);

    return () => {
      unsubscribe(update);
    };
  }, [num]);

  return (
    <div className="vote-box">
      <div className="header">
        <h2 className="title">react</h2>
        <span className="num">{supNum + oppNum}</span>
      </div>
      <VoteMain />
      <VoteFooter />
    </div>
  );
}
