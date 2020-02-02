import { MAX_STEPS, Players, Steps } from ".";
import { createMatrix } from "../helpers";


type PlayerMatrix = number[]
function checkByX(points: PlayerMatrix, maxSize: number) {
  let counter = 0;
  for (let i = 0; i < points.length; i++) {
    if (i % maxSize === 0) counter = 0;
    if (points[i] === 0) counter = 0;
    counter += points[i];
    if (counter === MAX_STEPS) break;
  }
  return counter === MAX_STEPS;
};

function checkByY(points: PlayerMatrix, maxSize: number) {
  let counter = 0;
  for (let column = 0; column < maxSize; column++) {
    for (let i = 0; i < maxSize; i++) {
      const idx = column + i * MAX_STEPS
      if (points[idx] === 0) counter = 0 
      counter += points[idx];
      if (counter === MAX_STEPS) {
        return true
      }
    }
    counter = 0;
  }
  return false
};

function checkByXY(points: PlayerMatrix, maxSize: number) {
  let leftToRightCounter = 0;
  let rightToLeftCounter = 0;
  for (let x = 0; x < maxSize; x++) {
    const leftToRightIdx = x + x * maxSize
    const rightToLeftIdx = (maxSize - 1) * (x + 1)
    if (points[leftToRightIdx] === 0) leftToRightCounter = 0
    if (points[rightToLeftIdx] === 0) rightToLeftCounter = 0
    leftToRightCounter += points[leftToRightIdx];
    rightToLeftCounter += points[rightToLeftIdx];

    if (leftToRightCounter === MAX_STEPS || rightToLeftCounter === MAX_STEPS) {
      return true
    }
  }

  return false;
}

function checkPlayer(points: PlayerMatrix, maxSize: number) {
  return checkByX(points, maxSize) || checkByY(points, maxSize) || checkByXY(points, maxSize);
}

interface ParsedSteps {
  x: number;
  y: number;
  player: Players
}

const parseSteps = (steps: Steps) => Object.entries(steps).reduce((acc, [xy, player]) => {
  const [x, y] = xy.split('/').map(n => +n - 1)
  acc.push({
    player,
    x,
    y
  })
  return acc;
}, [] as ParsedSteps[])

const getMaxSize = (steps: ParsedSteps[]) => Math.max(
  ...steps.map(step => step.x),
  ...steps.map(step => step.y)
) + 1

export function calcWinner(steps: Steps) {
  const parsedSteps = parseSteps(steps)
  const maxSize = getMaxSize(parsedSteps)
  const players = parsedSteps.reduce(
    (acc, step) => {
      acc[step.player][step.x + step.y * maxSize] = 1;
      return acc;
    },
    [createMatrix(maxSize), createMatrix(maxSize)]
  );
  return players.findIndex(playerMatrix => checkPlayer(playerMatrix, maxSize)) as Players | -1
}