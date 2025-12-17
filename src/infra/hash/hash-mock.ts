import { Hasher } from "@/application/port/hasher";

export class hashMock implements Hasher {
    hash(plain: string): Promise<string> {
        return Promise.resolve(`hash-password-${plain}`)
    }
    compare(plain: string, hash: string): Promise<boolean> {
        const plainTextHash = `hash-password-${plain}`
        return Promise.resolve(plainTextHash === hash)
    }

}