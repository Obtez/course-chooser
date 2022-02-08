import {NextApiRequest, NextApiResponse} from "next";
import {
  checkIfProvided,
  updateFailedError,
  wrongRequestMethodError
} from "lib/api/apiErrors";
import prisma from "lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    wrongRequestMethodError(res);
  }

  const id = req.query.id.toString();
  const courses = req.body;


  if (!id) {
    checkIfProvided(res, id, 'user ID');
  }
  if (!courses) {
    checkIfProvided(res, id, 'courses');
  }

  console.log(courses);

  const updStudent = await prisma.student.update({
    where: {
      id: id,
    },
    data: {
      topCourseID: courses.topPriority?.id || null,
      midCourseID: courses.midPriority?.id || null,
      lowCourseID: courses.lowPriority?.id || null,
    },
  });

  if (updStudent) {
    return res.status(201).json(updStudent);
  } else {
    updateFailedError(res, 'Course Update', 'no response from database');
  }
}