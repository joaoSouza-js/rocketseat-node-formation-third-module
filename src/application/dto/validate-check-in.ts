import { Gym } from "@/repositories/gym-repository"
import { Coordinate } from "../port/distance-calculator"
import { ListsParams } from "./lists-params"

export interface FetchNearbyGymCommand extends ListsParams {
    coordinate: Coordinate
    userId: string
}

export interface FetchNearbyGymResponse {
    gyms: Gym[]
}