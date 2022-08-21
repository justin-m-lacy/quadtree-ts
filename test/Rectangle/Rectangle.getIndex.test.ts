import { Rectangle } from '../../src/shapes/rectangle';
import { QuadRegions } from '../../src/regions';
import { testQtRegion, testRegions } from '../includes';

describe('Rectangle.prototype.qtRegions', () => {

    test('is a function', () => {
        expect(typeof Rectangle.prototype.qtRegions).toBe('function');
    });

    testQtRegion(new Rectangle({ x: 75, y: 0, width: 10, height: 10 }));

    testRegions({

        topRight: new Rectangle({ x: 75, y: 0, width: 10, height: 10 }),
        topLeft: new Rectangle({ x: 25, y: 0, width: 10, height: 10 }),
        bottomLeft: new Rectangle({ x: 25, y: 75, width: 10, height: 10 }),
        bottomRight: new Rectangle({ x: 75, y: 75, width: 10, height: 10 }),
        top: new Rectangle({ x: 0, y: 0, width: 100, height: 10 }),
        bottom: new Rectangle({ x: 0, y: 90, width: 100, height: 10 }),
        left: new Rectangle({ x: 0, y: 0, width: 10, height: 100 }),
        right: new Rectangle({ x: 90, y: 0, width: 10, height: 100 }),
        all: new Rectangle({ x: 25, y: 25, width: 50, height: 50 })
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
        expect(topLeft.qtRegions(node)).toEqual(QuadRegions.TopLeft);
        expect(bottomRight.qtRegions(node)).toEqual(QuadRegions.BottomRight);

        const smallest = 0.0000000000001;
        topLeft.x += smallest;
        topLeft.y += smallest;
        bottomRight.x -= smallest;
        bottomRight.y -= smallest;
        expect(topLeft.qtRegions(node)).toEqual(QuadRegions.All);
        expect(bottomRight.qtRegions(node)).toEqual(QuadRegions.All);
    });
});