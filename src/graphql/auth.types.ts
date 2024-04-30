import {Field, ObjectType} from 'type-graphql';

@ObjectType()
export class AuthenticationResponse {
  @Field()
  accessToken!: string;
}

export interface AuthContext {
  token: string;
}
