import { Service } from '@freshgum/typedi';
import jwt from 'jsonwebtoken';
import { Config } from '../config';

@Service([Config])
export class AuthService {
  constructor(private config: Config) { }
  createAccessToken = async (email: string) => {
    return jwt.sign({ email }, this.config.accessTokenSecret!, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
  };

  valid = (token: string) => {
    if (!token) return false;
    if (token.toLowerCase().startsWith('bearer ')) {
      token = token.slice(7);
    }

    try {
      const _result = jwt.verify(token, this.config.accessTokenSecret!, {
        algorithms: ['HS256'],
      }) as any;

      // todo: in a real system we might do something to validate this
      return true;
    } catch (e) {
      console.error(e, token);
      return false;
    }
  };
}
