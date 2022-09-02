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
	// const captchaContainer = document.querySelector(
	// 	'.captcha-container'
	// ) as HTMLElement;

	// const captcha = captchaContainer
	// 	? auth0.renderCaptcha(captchaContainer)
	// 	: undefined;

	const [state, dispatch] = React.useReducer(WidgetStateReducer, {
		...initialState,
		auth0,
		...props,
	} as WidgetState);

	React.useLayoutEffect(() => {
		if (!state?.initialized) {
			dispatch({ type: 'CLIENT_INITIALIZED' });
		}
	}, []);

	const goTo = (flow: AuthFlow) =>
		dispatch({ type: 'SWITCH_FLOW', payload: { flow } });

	const sendMagicLink = (email: string) => {
		const cb: Auth0Callback<any, Auth0Error> = <T, E = Auth0Error>(
			error: E,
			res: T
		) => {
			if (error) {
				console.group('=== sendMagicLink ERROR ===');
				console.log(JSON.stringify(error, null, 2));
				console.groupEnd();
				dispatch({ type: 'ERROR', error });
			} else {
				console.group('=== sendMagicLink ===');
				console.log(JSON.stringify(res, null, 2));
				console.groupEnd();

				dispatch({
					type: 'MAGIC_LINK_SENT',
					payload: { loginHint: email, res },
				});
			}
		};
		dispatch({ type: 'INITIATED_MAGIC_LINK' });

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
				console.group('=== verifyMagicLink ERROR ===');
				console.log(JSON.stringify(error, null, 2));
				console.groupEnd();
				dispatch({ type: 'ERROR', error });
			} else {
				console.group('=== verifyMagicLink ===');
				console.log(JSON.stringify(res, null, 2));
				console.groupEnd();

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

		dispatch({ type: 'INITIATED_SOCIAL_AUTH' });

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
