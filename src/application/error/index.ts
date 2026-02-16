import { BadRequestError } from "./bad-request"
import { CheckInLongDistanceError } from "./check-in-long-distance-error"
import { EmailNotFoundError } from "./email-already-used.error"
import { EmailAlreadyUsedError } from "./email-not-found.error"
import { ExpirationCheckInError } from "./expiration-check-in"
import { GymNotFoundError } from "./gym-not-found.error"
import { UserCredentialsError } from "./user-credentials-error"
import { UserNotFoundError } from "./user-not-found.error"

export const applicationsErrors = [
    BadRequestError,
    EmailAlreadyUsedError,
    GymNotFoundError,
    UserNotFoundError,
    UserCredentialsError,
    CheckInLongDistanceError,
    ExpirationCheckInError,
    EmailNotFoundError,
] as const


