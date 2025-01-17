import { QuadRegion } from '../regions';
import { NodeGeometry, Indexable } from '../types';
/**
 * Circle Geometry
 * @beta
 *
 * @remarks
 * This interface simply represents a circle geometry.
 */
export interface CircleGeometry {
    /**
     * X center of the circle.
     */
    x: number;
    /**
     * Y center of the circle.
     */
    y: number;
    /**
     * Radius of the circle.
     */
    r: number;
}
/**
 * Circle Constructor Properties
 * @beta
 * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
 */
export interface CircleProps<CustomDataType = void> extends CircleGeometry {
    /**
     * Custom data
     */
    data?: CustomDataType;
}
/**
 * Class representing a Circle.
 * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
 *
 * @example Without custom data (JS/TS):
 * ```typescript
 * const circle = new Circle({
 *   x: 100,
 *   y: 100,
 *   r: 32,
 * });
 * ```
 *
 * @example With custom data (JS/TS):
 * ```javascript
 * const circle = new Circle({
 *   x: 100,
 *   y: 100,
 *   r: 32,
 *   data: {
 *     name: 'Jane',
 *     health: 100,
 *   },
 * });
 * ```
 *
 * @example With custom data (TS):
 * ```typescript
 * interface ObjectData {
 *   name: string
 *   health: number
 * }
 * const entity: ObjectData = {
 *   name: 'Jane',
 *   health: 100,
 * };
 *
 * // Typescript will infer the type of the data property
 * const circle1 = new Circle({
 *   x: 100,
 *   y: 100,
 *   r: 32,
 *   data: entity,
 * });
 *
 * // You can also pass in a generic type for the data property
 * const circle2 = new Circle<ObjectData>({
 *   x: 100,
 *   y: 100,
 *   r: 32,
 * });
 * circle2.data = entity;
 * ```
 *
 * @example With custom class extending Circle (implements {@link CircleGeometry} (x, y, r)):
 * ```javascript
 * // extending inherits the qtRegions method
 * class Bomb extends Circle {
 *
 *   constructor(props) {
 *     // call super to set x, y, r (and data, if given)
 *     super(props);
 *     this.countdown = props.countdown;
 *   }
 * }
 *
 * const bomb = new Bomb({
 *   countdown: 5,
 *   x: 10,
 *   y: 20,
 *   r: 30,
 * });
 * ```
 *
 * @example With custom class and mapping {@link CircleGeometry}:
 * ```javascript
 * // no need to extend if you don't implement CircleGeometry
 * class Bomb {
 *
 *   constructor(countdown) {
 *     this.countdown = countdown;
 *     this.position = [10, 20];
 *     this.radius = 30;
 *   }
 *
 *   // add a qtRegions method to your class
 *   qtRegions(node) {
 *     // map your properties to CircleGeometry
 *     return Circle.prototype.qtRegions.call({
 *       x: this.position[0],
 *       y: this.position[1],
 *       r: this.radius,
 *     }, node);
 *   }
 * }
 *
 * const bomb = new Bomb(5);
 * ```
 *
 * @example With custom object that implements {@link CircleGeometry}:
 * ```javascript
 * const player = {
 *   name: 'Jane',
 *   health: 100,
 *   x: 10,
 *   y: 20,
 *   r: 30,
 *   qtRegions: Circle.prototype.qtRegions,
 * });
 * ```
 *
 * @example With custom object and mapping {@link CircleGeometry}:
 * ```javascript
 * // Note: this is not recommended but possible.
 * // Using this technique, each object would have it's own qtRegions method.
 * // Rather add qtRegions to your prototype, e.g. by using classes like shown above.
 * const player = {
 *   name: 'Jane',
 *   health: 100,
 *   position: [10, 20],
 *   radius: 30,
 *   qtRegions: function(node) {
 *     return Circle.prototype.qtRegions.call({
 *       x: this.position[0],
 *       y: this.position[1],
 *       r: this.radius,
 *     }, node);
 *   },
 * });
 * ```
 */
export declare class Circle<CustomDataType = void> implements CircleGeometry, Indexable {
    /**
     * X center of the circle.
     */
    x: number;
    /**
     * Y center of the circle.
     */
    y: number;
    /**
     * Radius of the circle.
     */
    r: number;
    /**
     * Custom data.
     */
    data?: CustomDataType;
    /**
     * Circle Constructor
     * @param props - Circle properties
     * @typeParam CustomDataType - Type of the custom data property (optional, inferred automatically).
     */
    constructor(props: CircleProps<CustomDataType>);
    /**
     * Determine which quadrant this circle belongs to.
     * @param node - Quadtree node to be checked
     * @returns Array containing indexes of intersecting subnodes (0-3 = top-right, top-left, bottom-left, bottom-right)
     */
    qtRegions(node: NodeGeometry): QuadRegion;
    /**
     * Check if a circle intersects an axis aligned rectangle.
     * @beta
     * @see https://yal.cc/rectangle-circle-intersection-test/
     * @param x - circle center X
     * @param y - circle center Y
     * @param r - circle radius
     * @param minX - rectangle start X
     * @param minY - rectangle start Y
     * @param maxX - rectangle end X
     * @param maxY - rectangle end Y
     * @returns true if circle intersects rectangle
     *
     * @example Check if a circle intersects a rectangle:
     * ```javascript
     * const circ = { x: 10, y: 20, r: 30 };
     * const rect = { x: 40, y: 50, width: 60, height: 70 };
     * const intersect = Circle.intersectRect(
     *   circ.x,
     *   circ.y,
     *   circ.r,
     *   rect.x,
     *   rect.y,
     *   rect.x + rect.width,
     *   rect.y + rect.height,
     * );
     * console.log(circle, rect, 'intersect?', intersect);
     * ```
     */
    static intersectRect(x: number, y: number, r: number, minX: number, minY: number, maxX: number, maxY: number): boolean;
}
