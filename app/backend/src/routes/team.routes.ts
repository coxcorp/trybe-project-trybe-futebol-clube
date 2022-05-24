import { Request, Response, NextFunction, Router } from 'express';
import TeamController from '../controllers/team.controller';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get(
  '/',
  async (req: Request, res:Response, next: NextFunction) => teamController.getAll(req, res, next),
);
teamRouter.get(
  '/:id',
  async (req: Request, res:Response, next: NextFunction) => teamController.getById(req, res, next),
);

export default teamRouter;
