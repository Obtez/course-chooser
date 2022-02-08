import {NextApiResponse} from "next";

export function notFoundError(res: NextApiResponse, message: string) {
  return res.status(404).json({ message });
}