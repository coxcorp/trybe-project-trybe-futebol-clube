import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardServices = new LeaderboardService();

export default class LeaderboardController {
  public getByPlayerAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, body } = await leaderboardServices.getByPlayerAll();
      return res.status(code).json(body);
    } catch (e) {
      next(e);
    }
  };

  public getByPlayer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { player }: { player?: string } = req.params;
      const { code, body } = await leaderboardServices.getByPlayer(player);
      return res.status(code).json(body);
    } catch (e) {
      next(e);
    }
  };
}
