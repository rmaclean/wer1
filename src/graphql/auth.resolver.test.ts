import { describe, expect, it, mock} from "bun:test";
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

describe('auth resolver', () => {

  mock.module('../config', () => {
    return {
      valid: true,
    }
  });

  it('should error without an email', async () => {
    const authService = new AuthService(new (await import('../config')).Config());
    const authResolver = new AuthResolver(authService);
    expect(authResolver.login("", "asd")).rejects.toThrow('Invalid credentials');
  });

  it('should error without an password', async () => {
    const authService = new AuthService(new (await import('../config')).Config());
    const authResolver = new AuthResolver(authService);
    expect(authResolver.login("asd", "")).rejects.toThrow('Invalid credentials');
  });

  it('should succeed with a valid email/password', async () => {
    const config = new (await import('../config')).Config();
    config.accessTokenSecret = '123';

    const authService = new AuthService(config);
    const authResolver = new AuthResolver(authService);
    const result = authResolver.login("asd", "asd");
    expect(result).resolves.toBeTruthy();
  });
});
