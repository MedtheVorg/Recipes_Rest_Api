import { Request, Response } from 'express';

export default async function healthCheck(req: Request, res: Response) {
  res.status(200).json({ message: 'Server is Up and Running.' });
}
