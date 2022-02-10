import {NextApiRequest, NextApiResponse} from "next";
import {
  checkIfProvided, notFoundError,
  wrongRequestMethodError
} from "lib/api/apiErrors";
import {getUserRole} from "lib/api/userHelper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id.toString();

  checkIfProvided(res, id, `user ID`);

  if (req.method === 'GET') {
    const role = await getUserRole(id);

    if (!role) {
      notFoundError(res, 'Error finding user role in database.');
    } else {
      res.status(200).send(role);
    }
  }


  // If request is not supported
  wrongRequestMethodError(res);
}