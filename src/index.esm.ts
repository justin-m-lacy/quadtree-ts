export { QuadRegions, QuadRegion } from './regions';
//ESM/CJS: named exports only
export { Quadtree } from './quadtree';
export { Rectangle } from './shapes/rectangle';
export { Circle } from './shapes/circle';
export { Line } from './shapes/line';

//Typedoc
export type { QuadtreeProps } from './quadtree';
export type { CircleProps, CircleGeometry } from './shapes/circle';
export type { LineProps, LineGeometry } from './shapes/line';
export type { RectangleProps, RectangleGeometry } from './shapes/rectangle';
export type { NodeGeometry, Indexable } from './types';