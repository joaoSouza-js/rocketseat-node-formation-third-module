import { Gym } from "@/repositories/gym-repository"

export interface FetchNearbyGymCommand {
    latitude: number
    longitude: number
    userId: string
}

export interface FetchNearbyGymResponse {
    gyms: Gym[]
}