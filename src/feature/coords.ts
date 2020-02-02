import { MouseEvent } from 'react';
import { BOX_SIZE } from '.';

export interface Coords {
  x: number;
  y: number;
}

export const getCoordsFromMouse = (event: MouseEvent): Coords => ({
  x: Math.ceil(event.pageX / BOX_SIZE),
  y: Math.ceil(event.pageY / BOX_SIZE),
});

export const isSameCoords = (coords: Coords, x: number, y: number) =>
  coords.x === x && coords.y === y;

export const coordsToString = (coords: Coords) => [coords.x, coords.y].join(':');
export const joinXY = (x: number, y: number) => [x, y].join(':');
