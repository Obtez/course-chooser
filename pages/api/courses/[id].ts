import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const userRole = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: id,
      },
      select: {
        role: true,
      },
    });
    if (!userRole) {
      res.status(401).json({ message: 'No user or user role found.' })
    }

    if (userRole && userRole.role === 'admin') await getAdminCourses();

    if(userRole && userRole.role === 'teacher') await getTeacherCourses();

    if(userRole && userRole.role === 'student') await getStudentCourses();
  }

  if (req.method === 'POST') {
  }



  async function getAdminCourses() {
    const result = await prisma.course.findMany();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json({message: 'No courses found'})
    }
  }

  async function getTeacherCourses() {}

  async function getStudentCourses() {}
}