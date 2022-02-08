import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";
import {checkIfProvided, notFoundError} from "lib/api/apiErrors";
import {getUserById} from "../../../../lib/api/userHelper";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.id.toString();
    if (!id) {
      notFoundError(res, 'User not found.');
    }

    const user = getUserById(id)
    if (user) {
      res.status(200).json(user)
    } else {
      notFoundError(res, 'User data not found.')
    }
  }

  if (req.method === 'POST') {
    const userID = req.query.id;
    const { courseID } = req.body;

    checkIfProvided(res, userID, 'User ID');
    checkIfProvided(res, courseID, 'Course ID');

    if (userID && courseID) {
      const userRole = await getUserRole(userID.toString());

      if (!userRole || userRole.role !== 'student') return res.status(401).json({ message: 'Only students can apply to courses.' });

      // TODO update with midCourseID and lowCourseID
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