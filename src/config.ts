import {Service} from 'typedi';

@Service()
export class Config {
  public port = +(process.env.PORT || '4000');
  public acrToken = process.env.ACR_TOKEN;

  valid = () => {
    return this.port && this.acrToken;
  };
}
