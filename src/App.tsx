import * as React from 'react';
import './styles.css';
import { TicTac } from './components/TicTac';
import { CurrentPlayer } from './components/CurrentPlayer';
import { stepBack, resetGame, MAX_STEPS } from './feature';

export default function App() {
  return (
    <div className="App">
      <div className='controls'>
        <div>
        <button onClick={() => stepBack()}>to back</button>
        <button onClick={() => resetGame()}>reset</button>
        </div>
        <div>
          Maximum steps {MAX_STEPS}
        </div>
        <CurrentPlayer />
      </div>
      <TicTac />
    </div>
  );
}
