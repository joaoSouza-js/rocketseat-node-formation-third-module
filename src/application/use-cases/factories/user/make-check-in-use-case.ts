import { HaversineGeolocationCalculator } from "@/infra/gelocation-calculator/haversine-geolocation"
import { CryptoUUidGenerator } from "@/infra/id-generator/crypto-uuid-generator"
import { PrismaCheckInRepositories } from "@/repositories/prisma/prisma-checkin-repositories"
import { prismaGymsRepositories } from "@/repositories/prisma/prisma-gyms-repositories"
import { prismaUsersRepositories } from "@/repositories/prisma/prisma-users-repositories"
import { CheckInUseCase } from "../../check-in"

export function makeCheckInUseCase() {
    const users = new prismaUsersRepositories()
    const gyms = new prismaGymsRepositories()
    const checkIns = new PrismaCheckInRepositories()
    const idGenerator = new CryptoUUidGenerator()
    const distanceCalculator = new HaversineGeolocationCalculator()
    const checkInUseCase = new CheckInUseCase({
        repositories: {
            checkIns,
            gyms,
            users
        },
        services: {
            distanceCalculator,
            idGenerator
        }
    })
    return checkInUseCase
}