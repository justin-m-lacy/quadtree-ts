import { Circle } from '../../src/shapes/circle';
import { Quadtree } from '../../src/quadtree';
import { Rectangle } from '../../src/shapes/rectangle';
import { NodeGeometry } from '../../src/types';

describe('Circle.constructor', () => {

    test('applies minimal arguments', () => {
        const circle = new Circle({ x: 20, y: 40, r: 100 });
        expect(circle.x).toBe(20);
        expect(circle.y).toBe(40);
        expect(circle.r).toBe(100);
        expect(circle.data).toBeUndefined();
    });

    test('applies data argument', () => {
        const data = { foo: 'bar' };
        const circle = new Circle({ x: 20, y: 40, r: 100, data });
        expect(circle.data).toEqual(data);
    });
});

describe('Circle additional use cases', () => {

    test('Circle.prototype.qtRegions can be referenced', () => {
        const tree = new Quadtree({ width: 100, height: 100, maxObjects: 1 });
        const circle1 = {
            x: 25,
            y: 25,
            r: 5,
            qtRegions: Circle.prototype.qtRegions,
        };
        const circle2 = new Circle({ x: 75, y: 75, r: 5 });
        tree.insert(circle1);
        tree.insert(circle2);

        const cursor = new Rectangle({ x: 0, y: 0, width: 50, height: 50 });
        expect(tree.retrieve(cursor)).toEqual([circle1]);
    });

    test('Circle.prototype.qtRegions is callable with mapped properties', () => {
        const tree = new Quadtree({ width: 100, height: 100, maxObjects: 1 });
        const circle1 = {
            pos: { x: 25, y: 25 },
            radius: 5,
            qtRegions: function (node: NodeGeometry) {
                return Circle.prototype.qtRegions.call({
                    x: this.pos.x,
                    y: this.pos.y,
                    r: this.radius,
                }, node);
            }
        };
        const circle2 = new Circle({ x: 75, y: 75, r: 5 });
        tree.insert(circle1);
        tree.insert(circle2);

        const cursor = new Rectangle({ x: 0, y: 0, width: 50, height: 50 });
        expect(tree.retrieve(cursor)).toEqual([circle1]);
    });
});

