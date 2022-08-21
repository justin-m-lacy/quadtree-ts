import { Quadtree } from './quadtree';
import { Rectangle } from './shapes/rectangle';

//This file only exports the "1.0" basics: Quadtree and Quadtree.Rectangle
//UMD/browser: export everything under a 'Quadtree' namespace
//@see https://github.com/rollup/rollup/issues/1044#issuecomment-253214545
export default Object.assign(Quadtree, {
    Rectangle,
});