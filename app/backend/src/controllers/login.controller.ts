import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/login.service';

const loginServices = new LoginService();

export default class LoginController {
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await loginServices.login(email, password);
      return res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };

  public loginValidate = async (req: Request, res: Response) => {
    try {
      const { authorization } = req.headers;
      if (authorization) {
        const result = await loginServices.loginValidate(authorization);
        const teste = result.payload.role;
        return res.status(200).json(teste);
      }
    } catch (e) {
      return res.status(400).json({ message: 'Invalid Token' });
    }
  };
}
