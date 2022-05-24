import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/team.service';

const teamServices = new TeamService();

export default class TeamController {
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await teamServices.getAll();
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await teamServices.getById(Number(id));
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
}
