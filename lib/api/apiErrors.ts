import {NextApiResponse} from "next";

export function notFoundError(res: NextApiResponse, message: string) {
  return res.status(404).json({ message });
}

export function notProvidedError(res: NextApiResponse, content: any, contentType: string) {
    if (!content) {
      return res.status(406).json({ message: `No ${contentType} provided.` })
    }
}

export function wrongRequestMethodError(res: NextApiResponse) {
  return res.status(400).json({ message: `Wrong request method.` });
}