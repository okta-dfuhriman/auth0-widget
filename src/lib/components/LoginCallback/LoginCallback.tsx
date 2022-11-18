import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyMagicLink } from '../../hooks';
import { PageLoader } from '../../components';

const LoginCallback = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { mutation: verifyMagicLink } = useVerifyMagicLink();

	const params = new URLSearchParams(location?.search);

	React.useEffect(() => {
		const getCode = () => params.get('verification_code');

		const getRedirect = () => {
			const redirectString = params.get('redirect_uri');

			if (redirectString) {
				return decodeURI(redirectString);
			}

			return;
		};
		const getEmail = () => {
			const emailString = params.get('email');

			if (emailString) {
				return decodeURI(emailString);
			}

			return;
		};

		const isRedirect = () => typeof getCode() === 'string';

		if (isRedirect()) {
			const code = getCode();

			navigate(location.pathname, { replace: true });

			if (code) {
				verifyMagicLink.mutate({
					code,
					redirectUri: getRedirect(),
					email: getEmail(),
					navigate,
				});
			}
		}
	}, [params]);

	return <PageLoader />;
};

export default LoginCallback;
