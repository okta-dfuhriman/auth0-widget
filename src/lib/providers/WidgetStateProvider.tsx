import React from 'react';
import { Management } from 'auth0-js';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useIsMutating } from '@tanstack/react-query';

import WidgetStateReducer, { initialState } from './WidgetStateReducer';
import { Auth0WebAuth } from '../utils/Auth0Auth';

import type {
	Auth0Callback,
	Auth0Error,
	Auth0UserProfile,
	Auth0Result,
	AuthorizeOptions,
	Captcha,
	CrossOriginLoginOptions,
	DoneCallback,
} from 'auth0-js';

export const WidgetStateContext = React.createContext(initialState);

export interface UserProfile extends Partial<Auth0UserProfile> {
	postal_code?: string;
	user_id: string;
}

export interface LoginWithPasswordProps {
	username?: string;
	email?: string;
	password: string;
	connection?: string;
}

export interface SendMagicLinkProps {
	email?: string;
	resend?: boolean;
	phoneNumber?: string;
}

const themeMapper: Theme.Mapper = {
	email: {
		title: 'Welcome',
		subtitle: 'Enter your email address to continue',
		hideLogo: false,
	},
	'email-verify': {
		title: 'Link Sent!',
		hideLogo: true,
	},
	password: {
		title: 'Welcome',
		subtitle: 'Enter your password to continue',
		hideLogo: false,
	},
	sms: {
		title: 'Welcome',
		subtitle: 'Enter your phone number to continue',
		hideLogo: false,
	},
};

export const getThemeContent = (flow: AuthFlow) =>
	themeMapper[flow as keyof Theme.Mapper];

const initializeState: Widget.StateProvider.StateInitializer = ({
	flow,
	theme,
	...state
}: Widget.StateProvider.State) => {
	const initState = {
		flow,
		theme: {
			hideLogo: !theme?.logo,
			...getThemeContent(flow),
			...theme,
		},
		...state,
	};

	return initState;
};

const WidgetStateProvider = ({
	authOptions,
	children,
	...rest
}: Widget.StateProvider.Props) => {
	const auth0 = new Auth0WebAuth(authOptions);
	const location = useLocation();
	const isLoadingAuth = useIsMutating(['login']) > 0;

	const [state, dispatch] = React.useReducer<
		React.Reducer<Widget.StateProvider.State, Widget.StateReducer.Action>,
		Widget.StateProvider.InitialWidgetState
	>(
		WidgetStateReducer,
		{
			...initialState,
			auth0,
			loginHint: authOptions?.loginHint,
			...rest,
		} as Widget.StateProvider.State,
		initializeState
	);

	React.useEffect(() => {
		let isMounted = true;

		if (state?.error?.error_description && isMounted) {
			toast.error(state?.error.error_description, {
				autoClose:
					state.error.error_description.length > 25 ? 5000 : 2500,
				onOpen: () => dispatch({ type: 'ERROR_RESET' }),
			});
		}

		return () => {
			isMounted = false;
		};
	}, [state?.error?.error_description]);

	React.useEffect(() => {
		let isMounted = true;

		if (
			isMounted &&
			state?.flow === 'email' &&
			!location.pathname.includes('verify_redirect') &&
			!isLoadingAuth &&
			!state?.isLoadingAuth &&
			auth0 &&
			state?.isAuthenticated === undefined
		) {
			checkSession();
		}

		return () => {
			isMounted = false;
		};
	}, [
		isLoadingAuth,
		location?.pathname,
		auth0,
		state?.isLoadingAuth,
		state?.isAuthenticated,
		state?.flow,
	]);

	React.useEffect(() => {
		let isMounted = true;

		if (
			state?.isAuthenticated &&
			state?.managementToken &&
			!state?.auth0Manage &&
			isMounted
		) {
			const auth0Manage = new Management({
				domain: authOptions?.apiDomain,
				token: state?.managementToken,
			});

			dispatch({
				type: 'INITIATED_AUTH0_MANAGE',
				payload: { auth0Manage },
			});
		}

		return () => {
			isMounted = false;
		};
	}, [state?.isAuthenticated, authOptions, state?.auth0Manage]);

	const errorCallback = <T, E = Auth0Error>(error: E, res: T) => {
		if (res) {
			console.group('=== CALLBACK RESPONSE ===');
			console.log(JSON.stringify(res, null, 2));
			console.groupEnd();
		}

		if (error) {
			console.group('=== ERROR ===');
			console.log(JSON.stringify(error, null, 2));
			console.groupEnd();

			return dispatch({ type: 'ERROR', error });
		}
	};

	const goTo = (flow: AuthFlow, args: any) =>
		dispatch({
			type: 'SWITCH_FLOW',
			payload: { flow, ...args },
		});

	const checkSession = async () => {
		const {
			clientID,
			apiDomain: domain,
			redirectUri = window.location.origin,
			audience,
			scope,
		} = authOptions;

		let accessToken: string | undefined;

		if (!isLoadingAuth) {
			dispatch({ type: 'INITIATED_CHECK_SESSION' });

			const payload: Widget.StateReducer.ActionPayload = {
				isAuthenticated: false,
				managementToken: undefined,
			};

			try {
				const result = await auth0.getTokens({
					clientID,
					domain,
					redirectUri,
					audience,
					scope,
					responseType: 'token id_token',
				});

				accessToken = result?.accessToken;
			} catch (error: unknown) {
				console.log(error);
				if (
					!['login_required', 'consent_required'].includes(
						(error as any)?.code
					)
				) {
					console.group('=== ERROR ===');
					console.log(JSON.stringify(error, null, 2));
					console.groupEnd();

					return dispatch({ type: 'ERROR', error });
				}
			}

			if (accessToken) {
				console.group('=== CHECK_SESSION RESPONSE ===');
				console.log(JSON.stringify(accessToken, null, 2));
				console.groupEnd();

				payload.isAuthenticated = !!accessToken;
				payload.managementToken = accessToken;
			}

			dispatch({
				type: 'MANAGEMENT_SESSION_CHECKED',
				payload,
			});
		}
	};

	const loginWithPassword = async ({
		email,
		username,
		password,
		connection: realm = authOptions?.connections?.password,
	}: LoginWithPasswordProps) => {
		const options: CrossOriginLoginOptions = {
			password,
			realm,
		};
		dispatch({ type: 'INITIATED_LOGIN_WITH_PASSWORD' });

		if (state?.captcha) {
			options['captcha'] = state.captcha.getValue();
		}

		if (username && email) {
			options['username'] = username;
		} else if (email) {
			options['email'] = email;
		}

		return auth0.login(options, errorCallback);
	};

	const loginWithRedirect = (options?: AuthorizeOptions) => {
		const defaultOptions = {
			connection: 'petco-com',
			login_hint: state?.loginHint,
		};

		return auth0.authorize({ ...defaultOptions, ...options });
	};

	const renderCaptcha = (
		container: HTMLDivElement,
		isReRender: boolean = false
	) => {
		let captcha: Captcha;

		const cb = <T, E = Auth0Error>(error: E, res: T) => {
			if (res) {
				console.group('=== CALLBACK RESPONSE ===');
				console.log(JSON.stringify(res, null, 2));
				console.groupEnd();
			}

			if (error) {
				console.group('=== CAPTCHA ERROR ===');
				console.log(JSON.stringify(error, null, 2));
				console.groupEnd();

				if (captcha) {
					console.log('reloading captcha!');
					captcha.reload(cb as DoneCallback);
				}

				return dispatch({ type: 'ERROR', error });
			}
		};

		captcha = auth0.renderCaptcha(container, undefined, cb);

		if (isReRender) {
			return captcha.reload(cb as DoneCallback);
		}

		if (captcha) {
			dispatch({ type: 'CAPTCHA_RENDERED', payload: { captcha } });
		}

		return captcha;
	};

	const sendMagicLink = async ({
		email,
		resend = false,
		phoneNumber,
	}: SendMagicLinkProps) => {
		try {
			if (email) {
				dispatch({ type: 'INITIATED_EMAIL_MAGIC_LINK' });

				await auth0.sendMagicLink({
					connection: 'email',
					send: 'code',
					email,
				});
			} else if (phoneNumber) {
				await auth0.sendMagicLink({
					connection: 'sms',
					send: 'code',
					phoneNumber,
				});
			}

			const theme: Theme.Content = {
				hideLogo: true,
			};

			if (resend) {
				theme['title'] = 'Link Resent!';
			}

			dispatch({
				type: 'MAGIC_LINK_SENT',
				payload: {
					loginHint: email || phoneNumber,
					theme,
				},
			});
		} catch (error: unknown) {
			console.group('=== sendMagicLink ERROR ===');
			console.log(JSON.stringify(error, null, 2));
			console.groupEnd();
			dispatch({ type: 'ERROR', error });
		}
	};

	const errorReset = () => dispatch({ type: 'ERROR_RESET' });

	const getUser = (userId: string) => {
		const cb = <T, E = Auth0Error>(error: E, user: T) => {
			if (user) {
				console.group('=== GET USER RESPONSE ===');
				console.log(JSON.stringify(user, null, 2));
				console.groupEnd();

				return dispatch({ type: 'USER_FETCHED', payload: { user } });
			}

			if (error) {
				console.group('=== UPDATE USER ERROR ===');
				console.log(JSON.stringify(error, null, 2));
				console.groupEnd();

				return dispatch({ type: 'ERROR', error });
			}
		};
		const auth0Manage = state?.auth0Manage;

		if (auth0Manage) {
			return auth0Manage.getUser(userId, cb);
		}
	};

	const updateUser = ({
		user_id: userId,
		given_name,
		family_name,
		postal_code,
		...data
	}: UserProfile) => {
		const cb = <T, E = Auth0Error>(error: E, user: T) => {
			if (user) {
				console.group('=== UPDATE USER RESPONSE ===');
				console.log(JSON.stringify(user, null, 2));
				console.groupEnd();

				return dispatch({ type: 'USER_UPDATED', payload: { user } });
			}

			if (error) {
				console.group('=== UPDATE USER ERROR ===');
				console.log(JSON.stringify(error, null, 2));
				console.groupEnd();

				return dispatch({ type: 'ERROR', error });
			}
		};

		const auth0Manage = state?.auth0Manage;

		if (auth0Manage) {
			if (postal_code) {
				auth0Manage.patchUserMetadata(userId, { postal_code }, cb);
			}

			if (given_name || family_name) {
				auth0Manage.getUser(
					userId,
					<Auth0UserProfile, Auth0Error>(
						userProfile: Auth0UserProfile,
						error: Auth0Error
					) => {
						if (userProfile) {
							auth0Manage.patchUserAttributes(
								userId,
								{
									name: '',
									nickname: '',
									picture: '',
									user_id: '',
									clientID: '',
									identities: [],
									created_at: '',
									updated_at: '',
									sub: '',
									...userProfile,
									given_name,
									family_name,
								},
								cb
							);
						}

						if (error) {
							console.group('=== UPDATE USER ERROR ===');
							console.log(JSON.stringify(error, null, 2));
							console.groupEnd();

							return dispatch({ type: 'ERROR', error });
						}
					}
				);
			}
		}
	};

	const verifyMagicLink = async ({
		code: verificationCode,
		email,
		phone: phoneNumber,
		redirectUri = window.location.origin,
		navigate,
	}: VerifyMagicLinkProps) => {
		try {
			const options = {
				connection: phoneNumber ? 'sms' : 'email',
				verificationCode,
			};

			dispatch({ type: 'INITIATED_EMAIL_MAGIC_LINK_VERIFY' });

			let result: Auth0Result | undefined;

			if (email) {
				result = await auth0.verifyMagicLink({
					...options,
					email,
				});
			} else if (phoneNumber) {
				result = await auth0.verifyMagicLink({
					...options,
					phoneNumber,
				});
			}

			console.group('=== verifyMagicLink ===');
			console.log(JSON.stringify(result, null, 2));
			console.groupEnd();

			dispatch({
				type: 'MAGIC_LINK_VERIFIED',
				payload: { magicRes: result },
			});

			if (navigate) {
				return navigate(redirectUri);
			}
		} catch (error: unknown) {
			console.group('=== verifyMagicLink ERROR ===');
			console.log(JSON.stringify(error, null, 2));
			console.groupEnd();
			dispatch({ type: 'ERROR', error });
		}
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
			checkSession,
			dispatch,
			errorReset,
			goTo,
			loginWithPassword,
			loginWithRedirect,
			renderCaptcha,
			sendMagicLink,
			socialLogin,
			updateUser,
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
