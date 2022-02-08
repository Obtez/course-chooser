import {NextApiRequest, NextApiResponse} from "next";
import prisma from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const userRole = await getUserRole(id.toString());
    if (!userRole) {
      return res.status(401).json({ message: 'No user or user role found.' })
    }

    if (userRole && userRole.role === 'admin') await getAdminCourses(id);

    if (userRole && userRole.role === 'teacher') await getTeacherCourses(id);

    if (userRole && userRole.role === 'student') await getStudentCourses(id);
  }

  if (req.method === 'POST') {
  const userID = req.query.id;
  const course = req.body;

  console.log(course)
    const userRole = await getUserRole(userID.toString());
    if (userRole === null) return res.status(401).json({message: 'User not' +
        ' found'})
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
        return res.status(401).json({message: 'There was an error creating' +
            ' the' +
            ' course.'})
      }
    }
    else {
      return res.status(301).json({message: 'You don\'t have the permission' +
          ' to' +
          ' create courses.'})
    }
  }

  async function getUserRole(id: string) {
    return await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: id,
      },
      select: {
        role: true,
      },
    });

  }


  async function getAdminCourses(id: string | string[]) {
    const result = await prisma.course.findMany();
    console.log(result);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json({message: 'No courses found'})
    }
  }

  async function getTeacherCourses(id: string | string[]) {
    const teacherCourses = await prisma.course.findMany({
      where: {
        // @ts-ignore
        teacherID: id,
      },
    });

    const allCourses = await prisma.course.findMany();

    if (teacherCourses || allCourses) {
      const result = { teacherCourses, allCourses };
      return res.status(200).json(result);
    } else {
      return res.status(401).json({message: 'No courses found'})
    }

  }

  async function getStudentCourses(id: string | string[]) {
    const allCourses = await prisma.course.findMany();
    const studentCourses = await prisma.student.findUnique({
      where: {
        id: id.toString(),
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
      return res.status(401).json({message: 'No courses found'})
    }

  }
}