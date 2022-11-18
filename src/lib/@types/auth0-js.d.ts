import { AuthOptions, CrossOriginLoginOptions } from 'auth0-js';

declare module 'auth0-js' {
	interface AuthOptions {
		loginHint?: string;
	}

	interface CrossOriginLoginOptions {
		captcha?: string;
	}
}
