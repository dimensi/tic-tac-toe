import * as React from 'react';
import './styles.css';
import { TicTac } from './components/TicTac';
import { CurrentPlayer } from './components/CurrentPlayer';
import { stepBack, resetGame, MAX_STEPS, $game } from './feature';
import { Button } from './components/Button';
import { cn } from './helpers';
import { useStore } from 'effector-react';

export default function App() {
  const { winner } = useStore($game)
  return (
    <div className="App">
      <div className={cn('controls', winner !== -1 && 'controlsOpened')}>
        <div>Maximum steps {MAX_STEPS}</div>
        <CurrentPlayer />
        <div>
          {winner === -1 && <Button onClick={() => stepBack()}>To back</Button>}
          <Button onClick={() => resetGame()}>Restart</Button>
        </div>
      </div>
      <TicTac />
    </div>
  );
}
