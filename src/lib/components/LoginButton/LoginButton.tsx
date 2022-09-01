import React from 'react';

import AppleLoginButton from './AppleLoginButton';
import GoogleLoginButton from './GoogleLoginButton';

export interface LoginButtonProps {
	variant?: 'google' | 'apple' | 'okta';
}

const LoginButton = ({ variant, ...props }: LoginButtonProps) => {
	return (
		<>
			{variant === 'google' && <GoogleLoginButton />}
			{variant === 'apple' && <AppleLoginButton />}
		</>
	);
};

export default LoginButton;
