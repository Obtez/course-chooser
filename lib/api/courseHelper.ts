import prisma from "../prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {notFoundError} from "./apiErrors";
import {getUserRole} from "./userHelper";

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

export async function addCourse(req: NextApiRequest, res: NextApiResponse) {
  const userID = req.query.id.toString();
  const course = req.body;

  const userRole = await getUserRole(userID);
  if (userRole === null) return res.status(401).json({
    message: 'User not' +
      ' found'
  })
  if (userRole.role === 'teacher' || userRole.role === 'admin') {
    const result = await prisma.course.create({
      data: {
        id: course.id,
        title: course.title,
        description: course.description,
        room: course.room,
        teacherID: course.teacherID,
        timeSlot: course.timeSlot,
      },
    });

    if (result) {
      return res.status(200).json(course);
    } else {
      return res.status(401).json({
        message: 'There was an error creating' +
          ' the' +
          ' course.'
      })
    }
  } else {
    return res.status(301).json({
      message: 'You don\'t have the permission' +
        ' to' +
        ' create courses.'
    })
  }
}
