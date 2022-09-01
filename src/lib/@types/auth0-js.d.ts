import { AuthOptions } from 'auth0-js';

declare module 'auth0-js' {
	interface AuthOptions {
		loginHint?: string;
	}
}
