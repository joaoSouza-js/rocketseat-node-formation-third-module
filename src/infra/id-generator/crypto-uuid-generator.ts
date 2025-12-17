import type { IdGenerator } from "@/application/port/id-generator";
import crypto from "node:crypto";

export class CryptoUUidGenerator implements IdGenerator {
    next(): string {
        const id = crypto.randomUUID()
        return id
    }

}