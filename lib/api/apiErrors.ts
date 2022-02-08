import {NextApiResponse} from "next";

export function notFoundError(res: NextApiResponse, message: string) {
  return res.status(404).json({ message });
}

export function checkIfProvided(res: NextApiResponse, content: any, contentType: string) {
    if (!content) {
      return res.status(406).json({ message: `No ${contentType} provided.` });
    }
    return null;
}

export function wrongRequestMethodError(res: NextApiResponse) {
  return res.status(405).json({ message: `Request method not allowed.` });
}

export function updateFailedError(res: NextApiResponse, execType: string, reason: string) {
  return res.status(500).json({ message: `${execType} failed: ${reason}.` });
}

export function forbiddenError(res: NextApiResponse) {
  return res.status(403).json({ message: `Request forbidden.` });
}