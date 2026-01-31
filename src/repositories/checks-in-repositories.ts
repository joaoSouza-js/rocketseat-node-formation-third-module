import { Prisma } from "generated/prisma/client";


export interface RegisterCheckIn extends Prisma.CheckInCreateInput {
    id: string;
    userId: string;
    gymId: string
}
export interface CheckIn {
    id: string;
    createdAt?: Date;
    validatedAt?: Date;
    userId: string | null;
    gymId: string | null;
}

export interface GetUserCheckInsHistory {
    page?: number
    limit?: number,
    userId: string
}

export interface CheckInsRepository {
    create(checkIn: RegisterCheckIn): Promise<CheckIn>
    findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    getUserCheckInsAmount(userId: string): Promise<number>
    getUserCheckInsHistory(props: GetUserCheckInsHistory): Promise<CheckIn[]>
}