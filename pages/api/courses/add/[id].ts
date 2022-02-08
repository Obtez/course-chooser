import {addCourse} from "lib/api/courseHelper";
import {wrongRequestMethodError} from "lib/api/apiErrors";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return await addCourse(req, res);
  }
  wrongRequestMethodError(res);
}