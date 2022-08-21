export declare type QuadIndex = 0 | 1 | 2 | 3;
export declare type QuadRegion = number;
export declare class QuadRegions {
    static readonly None = 0;
    static readonly TopLeft: number;
    static readonly TopRight: number;
    static readonly BottomLeft: number;
    static readonly BottomRight: number;
    static readonly All: number;
    static readonly Top: number;
    static readonly Bottom: number;
    static readonly Left: number;
    static readonly Right: number;
    static FromIndex(index: number): QuadRegion;
    static HasIndex(region: QuadRegion, index: QuadIndex): boolean;
    static Overlap(r1: QuadRegion, r2: QuadRegion): boolean;
    static Add(r1: QuadRegion, r2: QuadRegion): QuadRegion;
}
