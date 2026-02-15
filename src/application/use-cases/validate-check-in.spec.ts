
import { CheckInGuard } from '@/application/guards/check-in-guard'
import { UserGuard } from '@/application/guards/user-guard'
import { timeExpirationMock } from '@/infra/time-expiration/time-expriation-mock'
import type { RegisterCheckIn } from '@/repositories/checks-in-repositories'
import { CheckInMemoryRepository } from '@/repositories/in-memory/in-memory-check-respotistories'
import { inMemoryUserRepositories } from '@/repositories/in-memory/in-memory-user-repositories'
import type { RegisterUser, User } from '@/repositories/users-repository'
import { afterEach } from 'node:test'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ExpirationCheckInError } from '../error/expiration-check-in'
import type { TimeExpiration } from '../port/time-expiration'
import { ValidateCheckInUseCase } from './validate-check-in'

describe('validate check-in use case', () => {
    let checkIns: CheckInMemoryRepository
    let users: inMemoryUserRepositories

    let userGuard: UserGuard
    let checkInGuard: CheckInGuard
    let sut: ValidateCheckInUseCase
    let user: User
    let timeExpiration: TimeExpiration

    beforeEach(async () => {
        checkIns = new CheckInMemoryRepository()
        users = new inMemoryUserRepositories()
        timeExpiration = new timeExpirationMock()

        userGuard = new UserGuard(users)
        checkInGuard = new CheckInGuard(checkIns)

        sut = new ValidateCheckInUseCase({
            repositories: {
                checkIns: checkIns,
            },
            services: {
                timeExpiration
            },
            guards: {
                userGuard,
                checkInGuard,
            },
        })

        const userToCreate: RegisterUser = {
            email: 'john@test.com',
            id: 'john-id',
            name: 'John Doe',
            password_hash: '123456'
        }

        user = await users.create(userToCreate)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('should throw a ExpirationCheckInError if check-in has more than 30 minutes ', async () => {
        const checkIn: RegisterCheckIn = {
            gymId: "gym-id",
            id: "checkin-id",
            userId: "user-id",
        }

        vi.setSystemTime(new Date(2023, 0, 23, 12, 20))

        await checkIns.create(checkIn)

        const oneHoursInMileSeconds = 60 * 60 * 1000 // 1 hour

        vi.advanceTimersByTime(oneHoursInMileSeconds)


        await expect(sut.execute({
            userId: user.id,
            checkInId: checkIn.id,
        })).rejects.instanceof(ExpirationCheckInError)



    })

    it("should validate a check-in", async () => {
        const checkIn: RegisterCheckIn = {
            gymId: "gym-id",
            id: "checkin-id",
            userId: "user-id",
        }

        vi.setSystemTime(new Date(2023, 0, 23, 12, 20))

        await checkIns.create(checkIn)

        const twentyMinutesInMileSeconds = 20 * 60 * 1000 // 20 minutes

        vi.advanceTimersByTime(twentyMinutesInMileSeconds)

        await expect(sut.execute({
            userId: user.id,
            checkInId: checkIn.id,
        })).resolves.not.toThrow()

        const checkInValidated = await checkIns.findById(checkIn.id)
        expect(checkInValidated?.validatedAt).toBeTruthy()

    })


})
