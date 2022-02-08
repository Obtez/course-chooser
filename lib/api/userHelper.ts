import prisma from "../prisma";

export async function getUserRole(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      role: true,
    },
  });
}

