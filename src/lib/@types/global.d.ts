import type { AuthOptions as Auth0Options } from 'auth0-js';

declare global {
	type AuthFlow =
		| 'email'
		| 'email-verify'
		| 'mfa'
		| 'password'
		| 'signup'
		| 'sms'
		| 'progressive'
		| undefined;

	type Connections = 'google-oauth2' | 'apple' | 'facebook' | 'email' | 'sms';

	type RenderResultSuccess = {
		status: 'SUCCESS';
	};

	type RenderOptions = WidgetOptions;

	namespace Theme {
		interface Mapper {
			[key: string]: ThemeContent;
		}
		interface Content {
			title?: string | React.ReactNode;
			subtitle?: string | React.ReactNode;
			logo?: string | React.ReactNode;
			hideLogo?: boolean;
		}
	}

	type UserData = {
		userId?: string;
		email?: string;
		friendlyUserId?: string;
		tenant?: string;
		tenantFriendlyName?: string;
	};

	interface VerifyMagicLinkProps {
		code: string;
		email?: string;
		phone?: string;
		redirectUri?: string;
		navigate?: NavigateFunction;
	}

	namespace Widget {
		interface AuthOptions extends Auth0Options {
			apiDomain: string;
			connections?: {
				password?: string;
				email?: string;
				sms?: string;
				google?: string;
			};
		}

		type Options = {
			flow?: AuthFlow;
			container?: string;
			// mfaServerUrl?: string,
			// ticket?: string,
			// requestToken?: string,
			// postActionURL?: string,
			userData?: UserData;
			// globalTrackingId?: string
		};

		namespace StateReducer {
			interface Action {
				type: ActionType;
				payload?: ActionPayload;
				error?: any;
			}

			type ActionPayload = Partial<WidgetState>;

			type ActionType =
				| 'CAPTCHA_RENDERED'
				| 'CLIENT_INITIALIZED'
				| 'INITIATED_CHECK_SESSION'
				| 'INITIATED_LOGIN_WITH_PASSWORD'
				| 'INITIATED_EMAIL_MAGIC_LINK'
				| 'INITIATED_EMAIL_MAGIC_LINK_VERIFY'
				| 'INITIATED_SMS_MAGIC_LINK'
				| 'INITIATED_AUTH0_MANAGE'
				| 'INITIATED_SOCIAL_AUTH'
				| 'MAGIC_LINK_SENT'
				| 'MAGIC_LINK_VERIFIED'
				| 'MANAGEMENT_SESSION_CHECKED'
				| 'SWITCH_FLOW'
				| 'UPDATE_OPTIONS'
				| 'USER_FETCHED'
				| 'USER_UPDATED'
				| 'ERROR'
				| 'ERROR_RESET';
		}

		namespace StateProvider {
			interface CreateStateProps {
				newState: Partial<Widget.StateProvider.State>;
				state: Widget.StateProvider.State;
				payload: Widget.StateReducer.ActionPayload;
				error?: any;
			}
			interface Props extends Omit<WidgetState, 'authOptions'> {
				authOptions: Widget.AuthOptions;
				children?: React.ReactNode;
			}

			interface InitialWidgetState extends Omit<State, 'auth0'> {}

			type StateInitializer = (state: State) => State;

			interface State {
				auth0?: WebAuth;
				authOptions: Partial<AuthOptions>;
				flow: AuthFlow;
				initialized: boolean;
				isAuthenticated?: boolean;
				isLoading: boolean;
				isLoadingAuth: boolean;
				loginHint?: string;
				managementToken?: string;
				theme?: ThemeContent;
				auth0Manage?: Management;
				checkSession: () => void;
				errorReset: () => void;
				goTo: () => void;
				loginWithPassword: () => void;
				renderCaptcha: () => Captcha;
				sendMagicLink?: (email: string) => void;
				socialLogin?: (connection: Connections) => void;
				verifyMagicLink: (props: VerifyMagicLinkProps) => void;
				[key: string]: any;
			}
		}
	}
}
export {};
