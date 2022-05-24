import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/match.service';

const matchServices = new MatchService();

export default class MatchController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress }: { inProgress?: string } = req.query;
      const result = await matchServices.getAll(inProgress);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}
