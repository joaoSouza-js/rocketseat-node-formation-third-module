import { prisma } from "@/infra/prisma";

export async function userHasSameEmailRepository(email: string): Promise<boolean> {
    const userExist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return !!userExist
}