import React from 'react';
import { Avatar } from '@mui/material';

import Phone from './Phone';
import SecurityKey from './SecurityKey';
import Selector from './Selector';

export type Flows = 'webauthn-roaming' | 'sms' | 'sms-verify' | 'email' | 'otp';

export interface MfaWidgetProps {
	authenticator?: Flows;
	step?: number;
	inputValue?: string;
	userData?: any;
}

const MfaWidget = (props: MfaWidgetProps) => {
	const { authenticator, step, inputValue, userData } = props;

	let flow;

	switch (authenticator) {
		case 'webauthn-roaming':
			return <SecurityKey step={step} />;
		case 'sms':
			return <Phone />;
		case 'sms-verify':
			return <Phone verify={true} value={inputValue} />;
		case 'email':
		case 'otp':
		default:
			return <Selector />;
	}
};

MfaWidget.defaultProps = {
	avatar: true,
};

export default MfaWidget;
