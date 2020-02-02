import { MAX_STEPS, Players, Steps } from '.';
import { joinXY, Coords } from './coords';

const filterStepByPlayer = (steps: Steps, player: Players) =>
  Object.entries(steps).reduce((acc, [xy, p]) => {
    if (p !== player) return acc;
    acc.add(xy);
    return acc;
  }, new Set() as Set<string>);

function* generatePoints() {
  const oX = [0, 1, 1, 1, 0, -1, -1, -1];
  const oY = [-1, -1, 0, 1, 1, 1, 0, -1];
  for (let n = 0; n < 8; n++) {
    yield [oX[n], oY[n]];
  }
}

const createRadius = () => {
  const result: Record<string, number> = {};
  for (let [x, y] of generatePoints()) {
    result[joinXY(x, y)] = 1;
  }
  return result;
};

function checkWin(steps: Set<string>, startStep: Coords) {
  let counter = 1;
  const radius = createRadius();
  while (MAX_STEPS > counter) {
    for (let [x, y] of generatePoints()) {
      const i = joinXY(x, y);
      if (steps.has(joinXY(startStep.x + x * counter, startStep.y + y * counter))) {
        radius[i] += 1;
      }
    }
    counter++;
  }
  return Math.max(...Object.values(radius)) === MAX_STEPS;
}

export function checkOnWin(steps: Steps, newStep: Coords, player: Players) {
  console.log(steps, newStep, player);
  const stepsByPlayer = filterStepByPlayer(steps, player);
  if (checkWin(stepsByPlayer, newStep)) {
    return player;
  }
  return -1;
}
