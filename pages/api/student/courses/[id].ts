import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userID = req.query.id;
    console.log(userID);
    if (!userID) res.status(301).json({message: 'User not found.'})

    const courses = await prisma.student.findUnique({
      where: {
        // @ts-ignore
        id: userID,
      },
      select: {
        topCourseID: true,
        midCourseID: true,
        lowCourseID: true,
      },
    });

    if (courses) {
      res.status(200).json(courses)
    }

    if (!courses) res.status(301).json({message: 'Courses not found.'})
  }
}