import { Coordinate, DistanceCalculator } from "@/application/port/distance-calculator";

export class FakeDistanceCalculator implements DistanceCalculator {
    constructor(private readonly result: number) { }

    between(_: Coordinate, __: Coordinate): number {
        return this.result;
    }
}