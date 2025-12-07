import * as argon2 from "argon2";


export function Argon2Hasher() {

    const hash = async (plain: string): Promise<string> => {
        const hashedPromise = argon2.hash(plain)
        return hashedPromise
    }

    const compare = async (plain: string, hash: string): Promise<boolean> => {
        const comparePromise = argon2.verify(hash, plain)
        return comparePromise
    }

    return {
        hash,
        compare
    }
}