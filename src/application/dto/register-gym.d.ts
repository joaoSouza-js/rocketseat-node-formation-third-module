import { Gym } from "@/repositories/gym-repository"

export interface RegisterGymCommand {
    gym: {
        title: string
        description: string | null
        phone: string | null
        latitude: number
        longitude: number
    }
    userId: string
}

export interface RegisterGymResponse {
    gym: Gym
}