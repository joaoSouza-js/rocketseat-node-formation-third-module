import { ApplicationError } from "@/application/error/application-error"
import { ZodError } from "zod"

export class ZodValidationError extends ApplicationError {
  readonly statusCode = 400
  readonly errorCode = "ZodValidationError"

  constructor(zod: ZodError) {
    const message = zod.issues
      .map(i => `${i.path.join(".")}: ${i.message}`)
      .join(", ")

    super(message)
  }
}