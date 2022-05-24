import { Request, Response, NextFunction, Router } from 'express';
import MatchController from '../controllers/match.controller';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get(
  '/',
  async (req: Request, res:Response, next: NextFunction) => matchController.getAll(req, res, next),
);

export default matchRouter;
