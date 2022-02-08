import { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userID = req.query.id;
    if (!userID) res.status(301).json({message: 'User not found.'})

    const userRole = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: userID,
      },
      select: {
        role: true,
      }
    })

    if (userRole) {
      switch (userRole.role) {
        case 'admin':
          const adminUser = await prisma.user.findUnique({
            where: {
              // @ts-ignore
              id: userID,
            },
          })
          res.status(200).json(adminUser);
          break;

        case 'teacher':
          const teacherUser = await prisma.teacher.findUnique({
            where: {
              // @ts-ignore
              id: userID,
            },
          })
          res.status(200).json({...teacherUser, role: 'teacher'})
          break;

        case 'student':
          const studentUser = await prisma.student.findUnique({
            where: {
              // @ts-ignore
              id: userID,
            },
          })
          res.status(200).json({...studentUser, role: 'student'});
          break;

        default:
          res.status(400).json({ message: 'Error finding role' })
      }
    }

    if (!userRole) res.status(301).json({message: 'User not found.'})
  }

  if (req.method === 'POST') {
    const userID = req.query.id;
    console.log(userID);
    if (!userID) res.status(301).json({message: 'No User ID found.'})

    const userData = req.body;

    console.log(userData.grade)

    const user = await prisma.user.create({
      data: {
        // @ts-ignore
        id: userID,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'student',
      }
    });

    await prisma.student.create({
      data: {
        // @ts-ignore
        id: userID,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gradeID: userData.grade,
      }
    })

    if (user) {
      res.status(201).json(user);
    }

    if (!user) {
      res.status(301).json({ message: 'Could not save user.' })
    }
  }
}