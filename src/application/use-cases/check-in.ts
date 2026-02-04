import type { CheckInsRepository } from "@/repositories/checks-in-repositories";
import type { GymRepository } from "@/repositories/gym-repository";
import type { UsersRepository } from "@/repositories/users-repository";
import type { CheckInCommand, CheckInResponse } from "../dto/check-in";
import { CheckInLongDistanceError } from "../error/check-in-long-distance-error";
import { GymNotFoundError } from "../error/gym-not-found.error";
import { UserNotFoundError } from "../error/user-not-found.error";
import type { Coordinate, DistanceCalculator } from "../port/distance-calculator";
import type { IdGenerator } from "../port/id-generator";


interface Repositories {
    users: UsersRepository;
    gyms: GymRepository;
    checkIns: CheckInsRepository;
}

interface Services {
    idGenerator: IdGenerator;
    distanceCalculator: DistanceCalculator;
}

export interface CheckInUseCaseDeps {
    repositories: Repositories;
    services: Services;
}

export class CheckInUseCase {
    constructor(
        private readonly deps: CheckInUseCaseDeps
    ) { }

    async execute(input: CheckInCommand): Promise<CheckInResponse> {
        const {
            repositories: { checkIns, gyms, users },
            services: { distanceCalculator, idGenerator },
        } = this.deps;
        const gym = await gyms.findById(input.gymId);

        if (gym === null) {
            throw new GymNotFoundError(input.gymId);
        }

        const requestLocation: Coordinate = {
            latitude: input.latitude,
            longitude: input.longitude,
        };

        const gymLocation: Coordinate = {
            latitude: Number(gym.latitude),
            longitude: Number(gym.longitude),
        };

        const distance = distanceCalculator.between(
            requestLocation,
            gymLocation
        );
        const MAX_DISTANCE_IN_METERS = 100;

        if (distance > MAX_DISTANCE_IN_METERS) {
            throw new CheckInLongDistanceError()
        }

        const user = await users.findUserById(input.userId)

        if (user === null) {
            throw new UserNotFoundError(input.userId)
        }

        const checkInAlreadyMadeToday = await checkIns.findUserIdOnDate(
            input.userId,
            new Date()
        )

        if (checkInAlreadyMadeToday) {
            throw new Error("Check-in already made today")
        }

        const checkInId = idGenerator.next()
        const checkin = await checkIns.create({
            id: checkInId,
            gymId: gym.id,
            userId: user.id,
            validated_at: new Date(),
        })

        return {
            checkIn: checkin
        }

    }
}
