import {Arg, Mutation, Resolver} from 'type-graphql';
import {AuthenticationResponse} from './auth.types';
import {Service} from '@freshgum/typedi';
import {AuthService} from './auth.service';

@Service([AuthService])
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => AuthenticationResponse)
  login(
    @Arg('email', {nullable: false}) email: string,
    @Arg('password', {nullable: false}) password: string
  ) {
    if (email && password) {
      // todo: actually check the params; for demo, we assume all is great.
      return {accessToken: this.authService.createAccessToken(email)};
    }

    throw new Error('Invalid credentials');
  }
}
