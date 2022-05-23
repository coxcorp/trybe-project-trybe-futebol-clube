import { Request, Response, NextFunction } from 'express';
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

  public usernameValidation = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { username } = req.body;
    if (!username) {
      return res.status(400).send({ error: 'Username is required' });
    }
    if (typeof (username) !== 'string') {
      return res.status(422).send({ error: 'Username must be a string' });
    }
    if (username.length <= 2) {
      return res.status(422).send({ error: 'Username must be longer than 2 characters' });
    }
    next();
  };
}
