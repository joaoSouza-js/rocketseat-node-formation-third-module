import { CheckIn, CheckInsRepository, GetUserCheckInsHistory, RegisterCheckIn } from "../checks-in-repositories";


function checkSameDay(firstDate: Date | string, secondDate: Date | string): boolean {
    const date1 = new Date(firstDate)
    const date2 = new Date(secondDate)
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
}

export class CheckInMemoryRepository implements CheckInsRepository {

    findUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {

        const currentCheckIn = this.checkIns.find(checkIn => {
            const checkInDate = new Date(checkIn.createdAt ?? new Date())
            const isOnSameDay = checkSameDay(checkInDate, date)
            return isOnSameDay && checkIn.userId === userId
        }) ?? null
        return Promise.resolve(currentCheckIn)
    }
    private checkIns: CheckIn[] = []
    create(checkIn: RegisterCheckIn): Promise<CheckIn> {
        const checkInResponse: CheckIn = { ...checkIn, createdAt: new Date() }
        this.checkIns.push(checkInResponse)
        return Promise.resolve(checkInResponse)
    }

    getUserCheckInsAmount(userId: string): Promise<number> {
        const usersCheckInAmount = this.checkIns.filter(checkIn => checkIn.userId === userId)
        return Promise.resolve(usersCheckInAmount.length)
    }

    getUserCheckInsHistory({ userId, limit = 20, page = 1 }: GetUserCheckInsHistory): Promise<CheckIn[]> {
        const usersCheckInHistory = this.checkIns.filter(checkIn => checkIn.userId === userId)
        const historyWithPagination = usersCheckInHistory.slice((page - 1) * limit, page * limit)
        return Promise.resolve(historyWithPagination)
    }
}