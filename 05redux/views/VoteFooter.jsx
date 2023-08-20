import ThemeContext from '../ThemeContext';
import { useContext } from 'react';

export default function VoteFooter() {
  const { store } = useContext(ThemeContext);

  return (
    <div className="footer">
      <button
        className="sup"
        onClick={() => {
          store.dispatch({
            type: 'VOTE_ SUP',
          });
        }}
      >
        支持
      </button>
      <button
        className="opp"
        onClick={() => {
          store.dispatch({
            type: 'VOTE_OPP',
          });
        }}
      >
        反对
      </button>
    </div>
  );
}
