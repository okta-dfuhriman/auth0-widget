import type { Auth0Error, AuthOptions, WebAuth } from 'auth0-js';

import type { VerifyMagicLinkProps } from './WidgetStateProvider';

export interface WidgetState {
	authOptions: Partial<AuthOptions>;
	flow: AuthFlow;
	isLoading: boolean;
	auth0?: WebAuth;
	loginHint?: string;
	logo?: string | React.ReactNode;
	initialized: boolean;
	sendMagicLink?: (email: string) => void;
	socialLogin?: (connection: Connections) => void;
	verifyMagicLink?: (props: VerifyMagicLinkProps) => void;
	[key: string]: any;
}

export type ActionPayload = Partial<WidgetState>;

export type ActionType =
	| 'CLIENT_INITIALIZED'
	| 'INITIATED_MAGIC_LINK'
	| 'INITIATED_SOCIAL_AUTH'
	| 'MAGIC_LINK_SENT'
	| 'MAGIC_LINK_VERIFIED'
	| 'SESSION_CHECKED'
	| 'SWITCH_FLOW'
	| 'UPDATE_OPTIONS'
	| 'ERROR';

export interface Action {
	type: ActionType;
	payload?: ActionPayload;
	error?: any;
}

export const initialState: Omit<WidgetState, 'auth0'> = {
	flow: 'email-link',
	isLoading: true,
	initialized: false,
	authOptions: {
		redirectUri: `${window.location.origin}`,
		responseType: 'code',
		responseMode: 'query',
	},
};

interface CreateStateProps {
	newState: Partial<WidgetState>;
	state: WidgetState;
	payload: ActionPayload;
}

const WidgetStateReducer = (
	state: WidgetState,
	{ type, payload = {}, error }: Action
): WidgetState => {
	let newState: WidgetState | {} = {};

	const createState = ({
		newState = {},
		state,
		payload = {},
	}: CreateStateProps) => {
		const endState: WidgetState = {
			...state,
			...newState,
			...payload,
		};

		const { auth0, ...rest } = endState || {};

		console.group('=== NEW STATE ===');
		console.log(JSON.stringify(rest, null, 2));
		console.groupEnd();

		return endState;
	};

	const _default = () => createState({ state, newState, payload });

	switch (type) {
		case 'CLIENT_INITIALIZED':
			newState = {
				isLoading: false,
			};

			return _default();
		case 'INITIATED_MAGIC_LINK':
			newState = {
				isLoading: true,
			};

			return _default();
		case 'INITIATED_SOCIAL_AUTH':
			newState = {
				isLoading: true,
			};

			return _default();
		case 'MAGIC_LINK_SENT':
			newState = {
				flow: 'email-verify',
				isLoading: false,
			};

			return _default();
		case 'SESSION_CHECKED':
			newState = {
				isLoading: false,
			};

			return _default();
		case 'SWITCH_FLOW':
			return _default();
		case 'UPDATE_OPTIONS':
			newState = {
				authOptions: {
					...payload?.authOptions,
				},
			};
			return _default();
		case 'ERROR':
			return {
				...state,
				...newState,
				error,
			};
		default:
			throw new Error(`Type [${type}] not implemented!`);
	}
};

export default WidgetStateReducer;
