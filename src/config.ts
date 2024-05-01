import { Service } from '@freshgum/typedi';


@Service([])
export class Config {
  public port = +(process.env.PORT || '4000');
  public acrToken = process.env.ACR_TOKEN;
  public accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  public graphqlPath = process.env.GRAPHQL_PATH || '/graphql';

  valid = () => {
    return this.port && this.acrToken && this.accessTokenSecret && this.graphqlPath;
  };
}
