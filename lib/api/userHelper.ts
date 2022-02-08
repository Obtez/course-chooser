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

export async function getUserById(id: string) {
  return await prisma.student.findUnique({
    where: {
      id: id,
    },
    select: {
      topCourseID: true,
      midCourseID: true,
      lowCourseID: true,
      firstName: true,
      lastName: true,
      gradeID: true,
    },
  });
}

