import { QuadRegions } from "../src/regions";
import { Indexable, NodeGeometry } from '../src/types';

export const testQtRegion = (shape: Indexable): void => {

    test(`qtRegion returns QuadRegion`, () => {
        expect(typeof shape.qtRegions({ x: 0, y: 0, width: 100, height: 100 })).toBe('number');
    });

}

/**
 * 
 * @param shapes - contains shape objects that are tested to reside in exactly
 * the regions named. (Those regions and only those regions.)
 * @todo Index these by QuadRegion number.
 */
export const testRegions = (

    shapes: {
        topRight?: Indexable,
        topLeft?: Indexable,
        bottomLeft?: Indexable,
        bottomRight?: Indexable,
        top?: Indexable,
        bottom?: Indexable,
        left?: Indexable,
        right?: Indexable,
        all?: Indexable,
        positiveSlope?: Indexable,
        negativeSlope?: Indexable,
    },
    geometry: NodeGeometry = { x: 0, y: 0, width: 100, height: 100 }

): void => {

    if (shapes.topRight) testTopRight(shapes.topRight, geometry);
    if (shapes.topLeft) testTopLeft(shapes.topLeft, geometry);
    if (shapes.bottomLeft) testBottomLeft(shapes.bottomLeft, geometry);
    if (shapes.bottomRight) testBottomRight(shapes.bottomRight, geometry);
    if (shapes.top) testTop(shapes.top, geometry);
    if (shapes.bottom) testBottom(shapes.bottom, geometry);
    if (shapes.right) testRight(shapes.right, geometry);
    if (shapes.left) testLeft(shapes.left, geometry);
    if (shapes.positiveSlope) testPositiveSlope(shapes.positiveSlope, geometry)
    if (shapes.negativeSlope) testNegativeSlope(shapes.negativeSlope, geometry);
    if (shapes.all) testAll(shapes.all, geometry)


}

export const testTopRight = (shape: Indexable, geometry: NodeGeometry): void => {


    test('identifies quadrant top right', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.TopRight);
    });
}

export const testTopLeft = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies quadrant top left', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.TopLeft);
    });
}

export const testBottomLeft = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies quadrant bottom left', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.BottomLeft);
    });
}

export const testBottomRight = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies quadrant bottom right', () => {

        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.BottomRight);
    });
}

export const testTop = (shape: Indexable, geometry: NodeGeometry): void => {

    test('identifies overlapping top', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.TopLeft | QuadRegions.TopRight);
    });
}

export const testBottom = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies overlapping bottom', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.Bottom);
    });
}

export const testLeft = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies overlapping left', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.Left);
    });
}

export const testRight = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies overlapping right', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.Right);
    });
}

export const testPositiveSlope = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies top-right to bottom-left diagonal /', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.TopRight | QuadRegions.BottomLeft);
    });
}

export const testNegativeSlope = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies top-left to bottom-right diagonal \\', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.TopLeft | QuadRegions.BottomRight);
    });
}
export const testAll = (shape: Indexable, geometry: NodeGeometry): void => {
    test('identifies intersection with all regions \\', () => {
        expect(shape.qtRegions(geometry)).toEqual(QuadRegions.All);
    });
}