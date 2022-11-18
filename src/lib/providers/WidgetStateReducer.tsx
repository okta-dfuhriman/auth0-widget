import { getThemeContent } from './WidgetStateProvider';

export const initialState: Widget.StateProvider.InitialWidgetState = {
	authOptions: {
		redirectUri: `${window.location.origin}`,
		responseType: 'code',
		responseMode: 'fragment',
	},
	flow: 'email-link',
	isLoading: false,
};

const WidgetStateReducer: React.Reducer<
	Widget.StateProvider.State,
	Widget.StateReducer.Action
> = (
	state: Widget.StateProvider.State,
	{ type, payload = {}, error }: Widget.StateReducer.Action
): Widget.StateProvider.State => {
	let newState: Widget.StateProvider.State | {} = {};

	const createState = ({
		newState = {},
		state,
		payload = {},
		error,
	}: Widget.StateProvider.CreateStateProps) => {
		const newTheme: Theme.Content = getThemeContent(
			payload?.flow || newState?.flow || state?.flow
		);

		const endTheme: Theme.Content = {
			...state?.theme,
			...newTheme,
			...payload?.theme,
		};

		const endState: Widget.StateProvider.State = {
			...state,
			...newState,
			...payload,
			theme: endTheme,
			error,
		};

		const { auth0, ...rest } = endState || {};

		console.group('=== NEW STATE ===');
		console.log(`=== ${type} ===`);
		console.log(JSON.stringify(rest, null, 2));
		console.groupEnd();

		return endState;
	};

	const _default = () => createState({ state, newState, payload });

	switch (type) {
		case 'CAPTCHA_RENDERED':
			return _default();
		case 'CLIENT_INITIALIZED':
			newState = {
				initialized: true,
				isLoading: false,
				theme: {
					hideLogo: !state?.theme?.logo,
					...state?.theme,
				},
			};

			return _default();
		case 'INITIATED_CHECK_SESSION':
			newState = {
				isLoadingAuth: true,
			};

			return _default();
		case 'INITIATED_EMAIL_MAGIC_LINK_VERIFY':
			newState = {
				isLoadingAuth: true,
			};

			return _default();
		case 'INITIATED_AUTH0_MANAGE':
			return _default();
		case 'INITIATED_EMAIL_MAGIC_LINK':

		case 'INITIATED_SMS_MAGIC_LINK':

		case 'INITIATED_LOGIN_WITH_PASSWORD':

		case 'INITIATED_SOCIAL_AUTH':
			return _default();
		case 'MAGIC_LINK_SENT':
			newState = {
				flow: 'email-verify',
			};

			return _default();
		case 'MAGIC_LINK_VERIFIED':
			return _default();
		case 'MANAGEMENT_SESSION_CHECKED':
			newState = {
				isLoading: false,
				isLoadingAuth: false,
				isAuthenticated: false,
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
		case 'USER_FETCHED':
		case 'USER_UPDATED':
			return _default();
		case 'ERROR_RESET':
			if (state?.error) {
				delete state.error;
			}

			newState = {
				isLoading: false,
			};

			return _default();
		case 'ERROR':
			newState = {
				isLoading: false,
			};

			return createState({ newState, state, payload, error });
		default:
			throw new Error(`Type [${type}] not implemented!`);
	}
};

export default WidgetStateReducer;
