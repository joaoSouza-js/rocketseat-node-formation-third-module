import type { Coordinate, DistanceCalculator } from "@/application/port/distance-calculator";
import haversine from 'haversine-distance';
export class HaversineGeolocationCalculator implements DistanceCalculator {
    between(firstCoordinate: Coordinate, secondCoordinate: Coordinate): number {
        const distance = haversine(firstCoordinate, secondCoordinate)
        return distance
    }
}