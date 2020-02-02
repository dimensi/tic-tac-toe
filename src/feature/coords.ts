import { MouseEvent } from 'react';
import { BOX_SIZE } from '.';

export interface ICoords {
  x: number;
  y: number;
}

export class Coords implements ICoords {
  x = 0;
  y = 0;
  constructor(event: MouseEvent) {
    this.x = Math.ceil(event.pageX / BOX_SIZE)
    this.y = Math.ceil(event.pageY / BOX_SIZE)
  }
  is(x: number, y: number) {
    return this.x === x && this.y === y
  }
  toString() {
    return joinXY(this.x, this.y)
  }
}

export const joinXY = (x: number, y: number) => [x, y].join(':');
