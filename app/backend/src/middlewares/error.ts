import { NextFunction, Request, Response } from 'express';

export default function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  console.log(err);
  res.status(500).end();
}
