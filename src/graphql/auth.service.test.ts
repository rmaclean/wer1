import { beforeEach, describe, expect, it, setSystemTime} from "bun:test";
import { Config } from '../config';
import { AuthService } from './auth.service';

describe("auth service", () => {
	let config: Config;

	beforeEach(() => {
    setSystemTime();
		config = new Config();
		config.accessTokenSecret = "demo";
	});

	it('should create a token', async () => {
		const authService = new AuthService(config);
		const token = await authService.createAccessToken("test@test.com");
		expect(token).toBeTruthy();
	});

	it('should return true for a valid token', async () => {
		const authService = new AuthService(config);
		const token = await authService.createAccessToken("test@test.com");

		const isValid = authService.valid(token);
		expect(isValid).toBeTrue();
	});

	it('should return true for a valid token with bearer prefix', async () => {
		const authService = new AuthService(config);
		const token = 'bearer ' + (await authService.createAccessToken("test@test.com"));

		const isValid = authService.valid(token);
		expect(isValid).toBeTrue();
	});

	it('should return false for an invalid nonsense token', async () => {
		const authService = new AuthService(config);

		const isValid = authService.valid("nonsense");
		expect(isValid).toBeFalse();
	});

  it('should return false for a incorrect secret token', async () => {
		const authService = new AuthService(config);
		const token = await authService.createAccessToken("test@test.com");

    config.accessTokenSecret = "again";

		const isValid = authService.valid(token);
		expect(isValid).toBeFalse();
	});

  it('should return false for an expiren token', async () => {
		const authService = new AuthService(config);
		const token = await authService.createAccessToken("test@test.com");

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 10);

    setSystemTime(futureDate);

		const isValid = authService.valid(token);
		expect(isValid).toBeFalse();
	});
});
