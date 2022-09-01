import React from 'react';
import { WebAuth } from 'auth0-js';

import WidgetStateReducer, {
	initialState,
	WidgetState,
} from './WidgetStateReducer';

import type { Auth0Callback, Auth0Error, AuthOptions } from 'auth0-js';

export const WidgetStateContext = React.createContext(initialState);

export interface WidgetStateProviderProps
	extends Omit<WidgetState, 'authOptions'> {
	authOptions: AuthOptions;
	children?: React.ReactNode;
}

export interface VerifyMagicLinkProps {
	code: string;
	email?: string;
	phone?: string;
}

const WidgetStateProvider = ({
	authOptions,
	children,
	...props
}: WidgetStateProviderProps) => {
	const auth0 = new WebAuth(authOptions);

	const [state, dispatch] = React.useReducer(WidgetStateReducer, {
		...initialState,
		auth0,
		...props,
	} as WidgetState);

	const goTo = (flow: AuthFlow) =>
		dispatch({ type: 'SWITCH_FLOW', payload: { flow } });

	const sendMagicLink = (email: string) => {
		const cb: Auth0Callback<any, Auth0Error> = <T, E = Auth0Error>(
			error: E
		) => {
			if (error) {
				dispatch({ type: 'ERROR', error });
			} else {
				dispatch({
					type: 'MAGIC_LINK_SENT',
					payload: { loginHint: email },
				});
			}
		};

		auth0.passwordlessStart(
			{
				connection: 'email',
				send: 'code',
				email,
			},
			cb
		);
	};

	const verifyMagicLink = ({
		code: verificationCode,
		email,
		phone: phoneNumber,
	}: VerifyMagicLinkProps) => {
		const cb: Auth0Callback<any, Auth0Error> = <T, Auth0Error>(
			error: Auth0Error,
			res: T
		) => {
			if (error) {
				dispatch({ type: 'ERROR', error });
			} else {
				dispatch({
					type: 'MAGIC_LINK_VERIFIED',
					payload: { magicRes: res },
				});
			}
		};

		auth0.passwordlessLogin(
			{
				connection: phoneNumber ? 'sms' : 'email',
				email,
				phoneNumber,
				verificationCode,
			},
			cb
		);
	};

	const socialLogin = (connection: Connections) => {
		const {
			scope,
			responseType = 'code',
			clientID,
			redirectUri = window.location.origin,
		} = authOptions;

		return auth0.authorize({
			connection,
			scope,
			responseType,
			clientID,
			redirectUri,
		});
	};

	const contextValue = React.useMemo(
		() => ({
			...state,
			goTo,
			sendMagicLink,
			socialLogin,
			verifyMagicLink,
		}),
		[state]
	);

	return (
		<WidgetStateContext.Provider value={contextValue}>
			{children}
		</WidgetStateContext.Provider>
	);
};

export default WidgetStateProvider;
