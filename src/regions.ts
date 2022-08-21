export type QuadIndex = 0 | 1 | 2 | 3;

export type QuadRegion = number;

export class QuadRegions {

    static readonly None = 0;
    static readonly TopRight = 1 << 0;
    static readonly TopLeft = 1 << 1;
    static readonly BottomLeft = 1 << 2;
    static readonly BottomRight = 1 << 3;

    static readonly All = QuadRegions.TopRight | QuadRegions.TopLeft | QuadRegions.BottomLeft | QuadRegions.BottomRight;

    static readonly Top = QuadRegions.TopLeft | QuadRegions.TopRight;
    static readonly Bottom = QuadRegions.BottomLeft | QuadRegions.BottomRight;

    static readonly Left = QuadRegions.TopLeft | QuadRegions.BottomLeft;
    static readonly Right = QuadRegions.TopRight | QuadRegions.BottomRight;

    public static FromIndex(index: number): QuadRegion {
        return 1 << index;
    }

    public static HasIndex(region: QuadRegion, index: QuadIndex): boolean {
        return (region & (1 << index)) > 0;
    }

    public static Overlap(r1: QuadRegion, r2: QuadRegion): boolean {
        return (r1 & r2) !== 0;
    }

    public static Add(r1: QuadRegion, r2: QuadRegion): QuadRegion {
        return r1 | r2;
    }

}