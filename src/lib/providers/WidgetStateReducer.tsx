import type { Auth0Error, AuthOptions, WebAuth } from 'auth0-js';

import type { VerifyMagicLinkProps } from './WidgetStateProvider';

export interface WidgetState {
	authOptions: Partial<AuthOptions>;
	flow: AuthFlow;
	isLoading: boolean;
	auth0?: WebAuth;
	loginHint?: string;
	logo?: string | React.ReactNode;
	sendMagicLink?: (email: string) => void;
	socialLogin?: (connection: Connections) => void;
	verifyMagicLink?: (props: VerifyMagicLinkProps) => void;
	[key: string]: any;
}

export type ActionPayload = Partial<WidgetState>;

export type ActionType =
	| 'INITIALIZE_CLIENT'
	| 'MAGIC_LINK_SENT'
	| 'MAGIC_LINK_VERIFIED'
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
	isLoading: false,
	authOptions: {
		redirectUri: `${window.location.origin}`,
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

		console.group('=== NEW STATE ===');
		console.log(endState);
		console.groupEnd();

		return endState;
	};

	const _default = () => createState({ state, newState, payload });

	switch (type) {
		case 'INITIALIZE_CLIENT':
			const { auth0 } = payload || {};

			if (!auth0) {
				throw new Error(
					`Unable to initialize client as no valid WebAuth instance was provided!`
				);
			}

			newState = {
				auth0,
			};

			return _default();
		case 'MAGIC_LINK_SENT':
			newState = {
				flow: 'email-verify',
			};
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
