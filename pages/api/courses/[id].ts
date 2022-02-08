import {NextApiRequest, NextApiResponse} from "next";
import { getUserRole } from "../../../lib/api/userHelper";
import { getAdminCourses, getTeacherCourses, getStudentCourses } from "../../../lib/api/courseHelper";
import prisma from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.id.toString();

    const userRole = await getUserRole(id);
    if (!userRole) {
      return res.status(401).json({ message: 'No user or user role found.' })
    }

    if (userRole && userRole.role === 'admin') await getAdminCourses(id, res);

    if (userRole && userRole.role === 'teacher') await getTeacherCourses(id, res);

    if (userRole && userRole.role === 'student') await getStudentCourses(id, res);
  }

  if (req.method === 'POST') {
  const userID = req.query.id.toString();
  const course = req.body;

    const userRole = await getUserRole(userID);
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
}