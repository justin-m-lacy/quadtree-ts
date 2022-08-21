import { Quadtree } from './quadtree';
import { Rectangle } from './shapes/rectangle';
import { Circle } from './shapes/circle';
import { Line } from './shapes/line';

//This file exports all classes and utility functions
//UMD/browser: export everything under a 'Quadtree' namespace
//@see https://github.com/rollup/rollup/issues/1044#issuecomment-253214545
export default Object.assign(Quadtree, {
    Rectangle,
    Circle,
    Line,
});