import { MAX_STEPS, Players, Steps } from ".";
import { createMatrix } from "../../../helpers";


type PlayerMatrix = number[]
function checkByX(points: PlayerMatrix) {
  let counter = 0;
  for (let i = 0; i < points.length; i++) {
    if (i % MAX_STEPS === 0) counter = 0;
    counter += points[i];
    if (counter === MAX_STEPS) break;
  }
  return counter === MAX_STEPS;
};

function checkByY(points: PlayerMatrix) {
  let counter = 0;
  for (let column = 0; column < MAX_STEPS; column++) {
    for (let i = 0; i < MAX_STEPS; i++) {
      counter += points[column + i * MAX_STEPS];
    }
    if (counter === MAX_STEPS) {
      break;
    } else {
      counter = 0;
    }
  }
  return counter === MAX_STEPS;
};

function checkByXY(points: PlayerMatrix) {
  let leftToRight = 0;
  let rightToLeft = 0;
  for (let x = 0; x < MAX_STEPS; x++) {
    leftToRight += points[x + x * MAX_STEPS];
    rightToLeft += points[(MAX_STEPS - 1) * (x + 1)];
  }

  return leftToRight === MAX_STEPS || rightToLeft === MAX_STEPS;
}

function checkPlayer(points: PlayerMatrix) {
  return checkByX(points) || checkByY(points) || checkByXY(points);
}

export function calcWinner(current: Steps) {
  const players = Object.entries(current).reduce(
    (acc, [idx, player]) => {
      acc[player][+idx] = 1;
      return acc;
    },
    [createMatrix(MAX_STEPS), createMatrix(MAX_STEPS)]
  );
  return players.findIndex(playerMatrix => checkPlayer(playerMatrix)) as Players | -1
}