import { Request, Response, NextFunction, Router } from 'express';
import MatchController from '../controllers/match.controller';
import Validation from '../middlewares/validation';

const matchRouter = Router();
const matchController = new MatchController();
const validation = new Validation();

matchRouter.get(
  '/',
  async (req: Request, res:Response, next: NextFunction) => matchController.getAll(req, res, next),
);
matchRouter.post(
  '/',
  validation.tokenValidation,
  async (req: Request, res:Response, next: NextFunction) => matchController.create(req, res, next),
);
matchRouter.patch(
  '/:id/finish',
  validation.tokenValidation,
  async (req: Request, res:Response, next: NextFunction) => {
    matchController.finishMatch(req, res, next);
  },
);

export default matchRouter;
