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

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newMatch = req.body;
      const { code, body } = await matchServices.create(newMatch);
      return res.status(code).json(body);
    } catch (e) {
      next(e);
    }
  };

  public finishMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { code, body } = await matchServices.finishMatch(Number(id));
      return res.status(code).json(body);
    } catch (e) {
      next(e);
    }
  };

  public updateMatch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const teamGoals = req.body;
      const { code, body } = await matchServices.updateMatch(Number(id), teamGoals);
      return res.status(code).json(body);
    } catch (e) {
      next(e);
    }
  };
}
