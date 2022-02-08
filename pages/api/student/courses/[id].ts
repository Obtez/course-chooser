import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import {notFoundError} from "lib/api/apiErrors";


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
        firstName: true,
        lastName: true,
        gradeID: true,
      },
    });

    if (courses) {
      res.status(200).json(courses)
    }

    if (!courses) res.status(301).json({message: 'Courses not found.'})
  }

  if (req.method === 'POST') {
    const userID = req.query.id;
    const { courseID } = req.body;

    if (!userID || !courseID) return res.status(401).json({
      message: 'User' +
        ' or course not found.'
    });

    if (userID && courseID) {
      const userRole = await getUserRole(userID.toString());

      if (!userRole || userRole.role !== 'student') return res.status(401).json({ message: 'Only students can apply to courses.' });

      if (userRole.role === 'student') {
        const updStudent = await prisma.student.update({
          where: {
            id: userID.toString(),
          },
          data: {
            topCourseID: courseID,
          },
        });

        if (updStudent) {
          return res.status(201).json(updStudent);
        } else {
          return res.status(401).json({message: 'Could not apply to course.'});
        }
      }

    }

  }

  if (req.method === 'PUT') {
    const userID = req.query.id;
    const { courseID } = req.body;

    if (!userID) {
      notFoundError(res, 'No user ID provided.');
    }

    if (!courseID) {
      notFoundError(res, 'No course ID provided.');
    }

      const appliedCourses = await prisma.student.findUnique({
        where: {
          id: userID.toString(),
        },
        select: {
          topCourseID: true,
          midCourseID: true,
          lowCourseID: true,
        },
      })

      if (!appliedCourses) return res.status(401).json({
        message: 'No courses found.'
      })

      if (appliedCourses.topCourseID === courseID) {
        appliedCourses.topCourseID = '';
      } else if (appliedCourses.midCourseID === courseID) {
        appliedCourses.midCourseID = '';
      } else if (appliedCourses.lowCourseID === courseID) {
        appliedCourses.lowCourseID = '';
      } else {
        res.status(401).json({
          message: 'No courses with the same ID found.'
        })
      }

      const updStudent = await prisma.student.update({
        where: {
          id: userID.toString(),
        },
        data: {
          topCourseID: appliedCourses.topCourseID,
          midCourseID: appliedCourses.midCourseID,
          lowCourseID: appliedCourses.lowCourseID,
        },
      });

      if (updStudent) {
        return res.status(200).json(updStudent);
      } else {
        return res.status(401).json({ message: 'Could not save changes.' })
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
}