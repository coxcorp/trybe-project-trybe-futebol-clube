import { Request, Response, NextFunction } from 'express';
import jwtVerify from '../helpers/jwtVerify';
import User from '../database/models/User';

export default class Validation {
  incorrectMessage = 'Incorrect email or password';

  public passwordValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { password, email } = req.body;
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return res.status(401).json({ message: this.incorrectMessage });
    }

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (password.length < 6) {
      return res.status(422).send({ error: '"password" length must be 6 characters long' });
    }
    next();
  };

  public emailValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }
    const emailValid = (/\S+@\S+\.\S+/).test(email);
    if (!emailValid) {
      return res.status(401).json({ message: this.incorrectMessage });
    }
    next();
  };

  public tokenValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Token not found' });
    if (!jwtVerify(token)) return res.status(401).json({ error: 'Invalid token' });
    next();
  };
}
