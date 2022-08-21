import { Quadtree } from '../../src/quadtree';
import { Rectangle } from '../../src/shapes/rectangle';

describe('Quadtree.getRegions', () => {

    test('is a function', () => {
        const tree = new Quadtree({ width: 100, height: 100 });
        expect(typeof tree.getRegions).toBe('function');
    });

    test('returns a number', () => {
        const tree = new Quadtree({ width: 100, height: 100 });
        const rect = new Rectangle({ x: 0, y: 0, width: 100, height: 100 });
        expect(typeof tree.getRegions(rect)).toBe("number");
    });

});