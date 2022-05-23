import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';

const verifyToken = (token: string) => {
  const decodedToken = jwt
    .verify(token, readFileSync('./jwt.evaluation.key', 'utf8'));
  return decodedToken;
};

export default verifyToken;
