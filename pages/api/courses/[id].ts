import {NextApiRequest, NextApiResponse} from "next";
import { getUserRole } from "lib/api/userHelper";
import { getAdminCourses, getTeacherCourses, getStudentCourses } from "lib/api/courseHelper";
import {notFoundError} from "lib/api/apiErrors";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.id.toString();

    const userRole = await getUserRole(id);
    if (!userRole) {
      notFoundError(res, 'No user or user role found.');
    }

    if (userRole && userRole.role === 'admin') await getAdminCourses(id, res);

    if (userRole && userRole.role === 'teacher') await getTeacherCourses(id, res);

    if (userRole && userRole.role === 'student') await getStudentCourses(id, res);
  }
}