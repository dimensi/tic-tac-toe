import { checkOnWin } from './checkOnWin';
import { Steps, Players } from '.';

describe('Trying different cases with checkOnWin function', () => {
  it('case 1', () => {
    const testCase = {
      steps: {
        '1:1': 0,
        '1:2': 1,
        '2:2': 0,
        '1:3': 1,
        '3:3': 0,
        '1:4': 1,
      },
      newStep: {
        x: 4,
        y: 4,
      },
      player: 0,
    };

    expect(checkOnWin(testCase.steps as Steps, testCase.newStep, testCase.player as Players)).toBe(
      testCase.player
    );
  });

  it('case 3', () => {
    const testCase = {
      steps: {
        '1:1': 0,
        '8:11': 1,
        '9:10': 0,
        '9:11': 1,
        '10:10': 0,
        '10:11': 1,
        '11:10': 0,
      },
      newStep: {
        x: 11,
        y: 11,
      },
      player: 1,
    };

    expect(checkOnWin(testCase.steps as Steps, testCase.newStep, testCase.player as Players)).toBe(
      testCase.player
    );
  });

  it('case 3', () => {
    const testCase = {
      steps: {
        '1:1': 0,
        '10:11': 1,
        '9:13': 0,
        '9:12': 1,
        '11:13': 0,
        '12:9': 1,
        '13:12': 0,
      },
      newStep: {
        x: 11,
        y: 10,
      },
      player: 1,
    };

    expect(checkOnWin(testCase.steps as Steps, testCase.newStep, testCase.player as Players)).toBe(
      testCase.player
    );
  });
});
