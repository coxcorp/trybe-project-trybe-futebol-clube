import { Request, Response, NextFunction, Router } from 'express';
import LoginController from '../controllers/login.controller';
import Validation from '../middlewares/validation';

const loginRouter = Router();
const loginController = new LoginController();
const validation = new Validation();

loginRouter.post(
  '/',
  validation.emailValidation,
  validation.passwordValidation,
  async (req: Request, res:Response, next: NextFunction) => loginController.login(req, res, next),
);
loginRouter.get(
  '/validate',
  async (req: Request, res:Response) =>
    loginController.loginValidate(req, res),
);

export default loginRouter;
