import util from 'util';
import { WebAuth } from 'auth0-js';

import type {
	Auth0Result,
	CheckSessionOptions,
	PasswordlessStartOptions,
	PasswordlessVerifyOptions,
} from 'auth0-js';

export class Auth0WebAuth extends WebAuth {
	constructor(authOptions: Widget.AuthOptions) {
		super(authOptions);
	}

	getTokens: (options: CheckSessionOptions) => Promise<Auth0Result> =
		util.promisify(this.checkSession);
	sendMagicLink: (options: PasswordlessStartOptions) => Promise<void> =
		util.promisify(this.passwordlessStart);
	verifyMagicLink: (
		options: PasswordlessVerifyOptions
	) => Promise<Auth0Result> = util.promisify(this.passwordlessVerify);
}
