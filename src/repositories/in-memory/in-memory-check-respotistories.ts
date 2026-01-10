import { CheckIn, CheckInsRepository, RegisterCheckIn } from "../checks-in-repositoriest";


export class CheckInMemoryRepository implements CheckInsRepository {
    private checkIns: CheckIn[] = []
    create(checkIn: RegisterCheckIn): Promise<CheckIn> {
        this.checkIns.push(checkIn)
        return Promise.resolve(checkIn)
    }

}