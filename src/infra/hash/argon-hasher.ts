import type { Hasher } from "@/application/port/hasher";
import * as argon2 from "argon2";


export class Argon2Hasher implements Hasher {

    async hash(plain: string): Promise<string> {
        const hashedPromise = argon2.hash(plain)
        return hashedPromise
    }

    async compare(plain: string, hash: string): Promise<boolean> {
        const comparePromise = argon2.verify(hash, plain)
        return comparePromise
    }


}