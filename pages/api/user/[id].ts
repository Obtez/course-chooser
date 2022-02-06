import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const userID = req.query.id;
    console.log(userID)
    if (!userID) res.status(301).json({message: 'User not found.'})

    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: userID,
      }
    })

    if (user) {
      res.status(200).json({message: 'User found.'})
    }

    if (!user) res.status(301).json({message: 'User not found.'})
  }
}