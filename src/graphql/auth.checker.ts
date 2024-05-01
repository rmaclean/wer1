import type { AuthChecker } from 'type-graphql';
import type { AuthContext } from './auth.types';
import { Container } from '@freshgum/typedi';
import { AuthService } from './auth.service';

export const tokenAuthChecker: AuthChecker<AuthContext> = ({ context }) => {
  const authService = Container.get(AuthService);
  return authService.valid(context.token);
};
