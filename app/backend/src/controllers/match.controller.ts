import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/match.service';

const matchServices = new MatchService();

export default class MatchController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await matchServices.getAll();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}
