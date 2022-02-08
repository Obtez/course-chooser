import prisma from "../prisma";
import {NextApiResponse} from "next";
import {notFoundError} from "./apiErrors";

export async function getAdminCourses(id: string, res: NextApiResponse) {
  const result = await prisma.course.findMany();
  if (result) {
    return res.status(200).json(result);
  } else {
    notFoundError(res, 'No courses found.')
  }
}

export async function getTeacherCourses(id: string, res:NextApiResponse) {
  const teacherCourses = await prisma.course.findMany({
    where: {
      teacherID: id,
    },
  });

  const allCourses = await prisma.course.findMany();

  if (teacherCourses || allCourses) {
    const result = { teacherCourses, allCourses };
    return res.status(200).json(result);
  } else {
    notFoundError(res, 'No courses found.')
  }

}

export async function getStudentCourses(id: string, res: NextApiResponse) {
  const allCourses = await prisma.course.findMany();
  const studentCourses = await prisma.student.findUnique({
    where: {
      id: id,
    },
    select: {
      topCourseID: true,
      midCourseID: true,
      lowCourseID: true,
    },
  });

  const result = {
    allCourses: allCourses,
    topCourseID: studentCourses?.topCourseID || '',
    midCourseID: studentCourses?.midCourseID || '',
    lowCourseID: studentCourses?.lowCourseID || '',
  }

  if (allCourses) {
    return res.status(200).json(result);
  } else {
    notFoundError(res, 'No courses found.')
  }
}