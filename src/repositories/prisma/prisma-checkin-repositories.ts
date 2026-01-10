import { prisma } from "@/infra/prisma";
import { CheckIn, CheckInsRepository, RegisterCheckIn } from "../checks-in-repositoriest";

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
}