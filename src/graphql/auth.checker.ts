import {AuthChecker} from 'type-graphql';
import {AuthContext} from './auth.types.js';
import {Container} from 'typedi';
import {AuthService} from './auth.service.js';

export const tokenAuthChecker: AuthChecker<AuthContext> = ({context}) => {
  const authService = Container.get(AuthService);
  return authService.valid(context.token);
};
