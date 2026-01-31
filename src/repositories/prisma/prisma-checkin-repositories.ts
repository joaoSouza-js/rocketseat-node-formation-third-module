import { prisma } from "@/infra/prisma";
import { CheckIn, CheckInsRepository, GetUserCheckInsHistory, RegisterCheckIn } from "../checks-in-repositories";

export class PrismaCheckInRepositories implements CheckInsRepository {

    async create(checkIn: RegisterCheckIn): Promise<CheckIn> {
        const checkInCreated = await prisma.checkIn.create({
            data: {
                id: checkIn.id,
                user_Id: checkIn.userId,
                gym_Id: checkIn.gymId
            }
        })
        return {
            gymId: checkInCreated.gym_Id,
            id: checkInCreated.id,
            userId: checkInCreated.user_Id,
            createdAt: checkInCreated.created_at,
            validatedAt: checkInCreated.validated_at
        }
    }
    findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
        throw new Error("Method not implemented.");
    }

    async getUserCheckInsAmount(userId: string): Promise<number> {
        const checkInAmount = await prisma.checkIn.count({
            where: {
                user_Id: userId
            },
        })

        return checkInAmount
    }
    async getUserCheckInsHistory({ userId, limit = 20, page = 1 }: GetUserCheckInsHistory): Promise<CheckIn[]> {
        const checkInHistory = await prisma.checkIn.findMany({
            where: {
                user_Id: userId
            },
            take: limit,
            skip: (page - 1) * limit
        })

        const checkInHistoryFormatted: CheckIn[] = checkInHistory.map(checkIn => ({
            gymId: checkIn.gym_Id,
            id: checkIn.id,
            userId: checkIn.user_Id,
            createdAt: checkIn.created_at,
            validatedAt: checkIn.validated_at
        }))

        return checkInHistoryFormatted
    }

}