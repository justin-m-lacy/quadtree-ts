import { Rectangle } from '../../src/shapes/rectangle';
import { QuadRegions } from '../../src/regions';

describe('Rectangle.prototype.qtRegions', () => {

    test('is a function', () => {
        expect(typeof Rectangle.prototype.qtRegions).toBe('function');
    });

    test('returns an array', () => {
        const rect = new Rectangle({ x: 75, y: 0, width: 10, height: 10 });
        expect(Array.isArray(rect.qtRegions({ x: 0, y: 0, width: 0, height: 0 }))).toBe(true);
    });

    test('identifies quadrant top right', () => {
        const rect = new Rectangle({ x: 75, y: 0, width: 10, height: 10 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual(QuadRegions.TopRight);
    });

    test('identifies quadrant top left', () => {
        const rect = new Rectangle({ x: 25, y: 0, width: 10, height: 10 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([1]);
    });

    test('identifies quadrant bottom left', () => {
        const rect = new Rectangle({ x: 25, y: 75, width: 10, height: 10 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([2]);
    });

    test('identifies quadrant bottom right', () => {
        const rect = new Rectangle({ x: 75, y: 75, width: 10, height: 10 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([3]);
    });

    test('identifies overlapping top', () => {
        const rect = new Rectangle({ x: 0, y: 0, width: 100, height: 10 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([0, 1]);
    });

    test('identifies overlapping bottom', () => {
        const rect = new Rectangle({ x: 0, y: 90, width: 100, height: 10 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([2, 3]);
    });

    test('identifies overlapping left', () => {
        const rect = new Rectangle({ x: 0, y: 0, width: 10, height: 100 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([1, 2]);
    });

    test('identifies overlapping right', () => {
        const rect = new Rectangle({ x: 90, y: 0, width: 10, height: 100 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([0, 3]);
    });

    test('identifies all', () => {
        const rect = new Rectangle({ x: 25, y: 25, width: 50, height: 50 });
        expect(rect.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toEqual([0, 1, 2, 3]);
    });

    test('identifies edge', () => {
        const node = { x: 0, y: 0, width: 100, height: 100 };
        const topLeft = new Rectangle({ x: 25, y: 25, width: 25, height: 25 });
        const bottomRight = new Rectangle({ x: 50, y: 50, width: 25, height: 25 });

        //the current implementation is not greedy on shapes sitting exactly on the edge
        //Imagine these are exactly starting/ending on the edges:
        //      |
        //     ▮|  <-- only in top left quadrant
        // -----|-----
        //      |▮ <-- only in bottom right quadrant
        //      |
        expect(topLeft.qtRegions(node)).toEqual([1]);
        expect(bottomRight.qtRegions(node)).toEqual([3]);

        const smallest = 0.0000000000001;
        topLeft.x += smallest;
        topLeft.y += smallest;
        bottomRight.x -= smallest;
        bottomRight.y -= smallest;
        expect(topLeft.qtRegions(node)).toEqual([0, 1, 2, 3]);
        expect(bottomRight.qtRegions(node)).toEqual([0, 1, 2, 3]);
    });
});