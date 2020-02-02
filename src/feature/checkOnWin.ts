import { MAX_STEPS, Players, Steps } from '.';
import { joinXY, ICoords } from './coords';

const roundPoints = [
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
];

const createRadius = () => {
  const result: Record<string, number> = {};
  for (let [x, y] of roundPoints) {
    result[joinXY(x, y)] = 0;
  }
  return result;
};

function checkWin(steps: Steps, startStep: ICoords, player: Players) {
  let counter = 0;
  const radius = createRadius();
  while (MAX_STEPS > counter) {
    for (let [x, y] of roundPoints) {
      const i = joinXY(x, y);
      const newX = startStep.x + x * counter;
      const newY = startStep.y + y * counter;
      radius[i] += steps[joinXY(newX, newY)] === player ? 1 : 0;
    }
    counter++;
  }
  const x = radius['1:0'] + radius['-1:0'];
  const y = radius['0:-1'] + radius['0:1'];
  const xy = radius['-1:1'] + radius['1:-1'];
  const yx = radius['1:1'] + radius['-1:-1'];
  return Math.max(x, y, xy, yx) >= MAX_STEPS - 1;
}

export function checkOnWin(steps: Steps, newStep: ICoords, player: Players) {
  if (checkWin(steps, newStep, player)) {
    return player;
  }
  return -1;
}
