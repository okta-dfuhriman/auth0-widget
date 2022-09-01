import React from 'react';

import MfaSecurityKeyConfirm from './MfaSecurityKeyConfirm';
import MfaSecurityKeyNickname from './MfaSecurityKeyNickname';
import MfaSecurityKeyStart from './MfaSecurityKeyStart';

export interface SecurityKeyProps {
	step?: number;
}

const SecurityKey = (props: SecurityKeyProps) => {
	const { step } = props;

	switch (step) {
		case 1:
			return <MfaSecurityKeyConfirm />;
		case 2:
			return <MfaSecurityKeyNickname action='Save' />;
		case 3:
			return <MfaSecurityKeyNickname step={step} />;
		default:
			return <MfaSecurityKeyStart />;
	}
};

export default SecurityKey;
