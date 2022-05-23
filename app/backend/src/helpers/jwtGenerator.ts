import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/User';

const generateToken = (payload: User) => {
  const secret = readFileSync('./jwt.evaluation.key', 'utf8');
  const token = jwt.sign({ payload }, secret, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });
  return token;
};

export default generateToken;
