import { IdGenerator } from "@/application/port/id-generator";

export class IdGeneratorMock implements IdGenerator {
    next(): string {
        const id = String(Math.random() ** 80)
        return id
    }
}