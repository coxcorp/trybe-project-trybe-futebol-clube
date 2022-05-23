import { compareSync } from 'bcryptjs';
import JwtPayload from '../interfaces/jwtPayload';
import User from '../database/models/User';
import generateToken from '../helpers/jwtGenerator';
import verifyToken from '../helpers/jwtVerify';

export default class LoginService {
  private user;

  constructor() {
    this.user = User;
  }

  public login = async (email: string, password: string) => {
    const result = await this.user.findOne({ where: { email } });
    if (!result || !compareSync(password, result.password)) {
      return { message: 'Incorrect email or password' };
    }
    return {
      user: {
        id: result.id,
        username: result.username,
        role: result.role,
        email: result.email,
      },
      token: generateToken(result),
    };
  };

  public loginValidate = async (token: string) => {
    const result = verifyToken(token);
    return result as JwtPayload;
  };
}
