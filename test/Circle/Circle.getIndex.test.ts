import { Circle } from '../../src/shapes/circle';
import { testQtRegion, testRegions } from '../includes';
import { QuadRegions } from '../../src/regions';

describe('Circle.prototype.qtRegions', () => {

    test('is a function', () => {
        expect(typeof Circle.prototype.qtRegions).toBe('function');
    });

    testQtRegion(new Circle({ x: 20, y: 40, r: 100 }));

    testRegions({

        topRight: new Circle({ x: 75, y: 25, r: 10 }),
        topLeft: new Circle({ x: 25, y: 25, r: 10 }),
        bottomLeft: new Circle({ x: 25, y: 75, r: 10 }),
        bottomRight: new Circle({ x: 75, y: 75, r: 10 }),
        top: new Circle({ x: 50, y: 25, r: 10 }),
        bottom: new Circle({ x: 50, y: 75, r: 10 }),
        left: new Circle({ x: 25, y: 50, r: 10 }),
        right: new Circle({ x: 75, y: 50, r: 10 }),
        all: new Circle({ x: 50, y: 50, r: 10 })
    });

    test('identifies edge', () => {
        const node = { x: 0, y: 0, width: 100, height: 100 };
        const topLeft = new Circle({ x: 25, y: 25, r: 25 });
        const bottomRight = new Circle({ x: 75, y: 75, r: 25 });

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
        expect(topLeft.qtRegions(node)).toEqual(QuadRegions.Top | QuadRegions.BottomLeft);
        expect(bottomRight.qtRegions(node)).toEqual(QuadRegions.Bottom | QuadRegions.TopRight);
    });
});