export interface Coordinate {
    latitude: number;
    longitude: number;
};
export interface DistanceCalculator {
    between(a: Coordinate, b: Coordinate): number;
}