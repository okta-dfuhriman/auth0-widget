import React from 'react';
import { Avatar, Container, Paper, Stack } from '@mui/material';

import Phone from './Phone';
import SecurityKey from './SecurityKey';
import Selector from './Selector';

export type Flows = 'webauthn-roaming' | 'sms' | 'sms-verify' | 'email' | 'otp';

export interface MfaWidgetProps {
	authenticator?: Flows;
	avatar?: boolean;
	step?: number;
	inputValue?: string;
	userData?: any;
}

const MfaWidget = (props: MfaWidgetProps) => {
	const { authenticator, avatar, step, inputValue, userData } = props;

	let flow;

	switch (authenticator) {
		case 'webauthn-roaming':
			flow = <SecurityKey step={step} />;
			break;
		case 'sms':
			flow = <Phone />;
			break;
		case 'sms-verify':
			flow = <Phone verify={true} value={inputValue} />;
			break;
		case 'email':
		case 'otp':
		default:
			flow = <Selector />;
			break;
	}

	return (
		<Container maxWidth='xs'>
			<Paper elevation={3} sx={{ display: 'flex', minHeight: 600, py: 3, px: 1 }}>
				<Stack spacing={3} direction='column' alignItems='center' sx={{ flexGrow: 1, pb: 3 }}>
					{avatar && (
						<Avatar
							src='https://pbs.twimg.com/profile_images/1423289570452328448/k_eYKdG6_400x400.png'
							alt='logo'
							sx={{ width: 72, height: 72 }}
						/>
					)}
					{flow}
				</Stack>
			</Paper>
		</Container>
	);
};

MfaWidget.defaultProps = {
	avatar: true,
};

export default MfaWidget;
