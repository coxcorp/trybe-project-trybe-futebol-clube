import { Request, Response, NextFunction, Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get(
  '/',
  async (req: Request, res:Response, next: NextFunction) =>
    leaderboardController.getByPlayerAll(req, res, next),
);
leaderboardRouter.get(
  '/:player',
  async (req: Request, res:Response, next: NextFunction) =>
    leaderboardController.getByPlayer(req, res, next),
);

export default leaderboardRouter;
