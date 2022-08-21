import { Line } from '../../src/shapes/line';
import { testQtRegion, testRegions } from '../includes';
import { QuadRegions } from '../../src/regions';

describe('Line.prototype.qtRegions', () => {

    test('is a function', () => {
        expect(typeof Line.prototype.qtRegions).toBe('function');
    });

    testQtRegion(new Line({ x1: 20, y1: 40, x2: 100, y2: 200 }));

    testRegions({

        topRight: new Line({ x1: 75, y1: 25, x2: 80, y2: 30 }),
        topLeft: new Line({ x1: 25, y1: 25, x2: 30, y2: 30 }),
        bottomLeft: new Line({ x1: 25, y1: 75, x2: 30, y2: 80 }),
        bottomRight: new Line({ x1: 75, y1: 75, x2: 80, y2: 80 }),
        top: new Line({ x1: 25, y1: 25, x2: 75, y2: 25 }),
        bottom: new Line({ x1: 25, y1: 75, x2: 75, y2: 75 }),
        left: new Line({ x1: 25, y1: 25, x2: 25, y2: 75 }),
        right: new Line({ x1: 75, y1: 25, x2: 75, y2: 75 }),
        positiveSlope: new Line({ x1: 25, y1: 75, x2: 75, y2: 25 }),
        negativeSlope: new Line({ x1: 25, y1: 25, x2: 75, y2: 75 }),
    });

    /**
     * @todo
     * @remarks 
     * There is a bug where detection fails on corner intersections 
     * when the line enters/exits the node exactly at corners (45°)
     * {@link https://stackoverflow.com/a/18292964/860205}
     */
    // test('identifies diagonal / overstretch', () => {
    //     const line = new Line({ x1: 125, y1: -25, x2: -25, y2: 125 });
    //     expect(line.qtRegions({x: 0, y: 0, width: 100, height: 100})).toEqual([0, 2]);
    // });

    // test('identifies diagonal \\ overstretch', () => {
    //     const line = new Line({ x1: -25, y1: -25, x2: 125, y2: 125 });
    //     expect(line.qtRegions({x: 0, y: 0, width: 100, height: 100})).toEqual([1, 3]);
    // });

    test('identifies edge', () => {
        const node = { x: 0, y: 0, width: 100, height: 100 };
        const topLeft = new Line({ x1: 25, y1: 25, x2: 50, y2: 50 });
        const bottomRight = new Line({ x1: 50, y1: 50, x2: 75, y2: 75 });

        //the current implementation is not greedy on shapes sitting exactly on the edge
        //Imagine these are exactly starting/ending on the edges:
        //      |
        //     ▮|  <-- only in top left quadrant
        // -----|-----
        //      |▮ <-- only in bottom right quadrant
        //      |
        expect(topLeft.qtRegions(node)).toEqual(QuadRegions.TopLeft);
        expect(bottomRight.qtRegions(node)).toEqual(QuadRegions.BottomRight);

        const smallest = 0.0000000000001;
        topLeft.x2 += smallest;
        topLeft.y2 += smallest;
        bottomRight.x1 -= smallest;
        bottomRight.y1 -= smallest;
        expect(topLeft.qtRegions(node)).toEqual(QuadRegions.TopLeft | QuadRegions.BottomRight);
        expect(bottomRight.qtRegions(node)).toEqual(QuadRegions.TopLeft | QuadRegions.BottomRight);
    });
});