import { CheckIn } from "@/repositories/checks-in-repositoriest"

export interface CheckInCommand {
    userId: string
    gymId: string,
    latitude: number,
    longitude: number
}

export interface CheckInResponse {
    checkIn: CheckIn
}