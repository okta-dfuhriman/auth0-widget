import React from 'react';
import { Stack } from '@mui/material';
import {
	LockOutlined as LockIcon,
	MailOutline as EmailIcon,
	PhoneAndroidOutlined as PhoneIcon,
	SystemUpdateAltOutlined as PushIcon,
	Usb as UsbIcon,
} from '@mui/icons-material';

import { default as Button } from './SelectorButton';
import WidgetContent from '../WidgetContent';

const Selector = () => {
	return (
		<WidgetContent title='Keep Your Account Safe' content='Please add an authentication method.'>
			<Stack spacing={3} sx={{ flexGrow: 1 }}>
				<Button startIcon={<PushIcon />}>Push via Auth0 Guardian</Button>
				<Button startIcon={<LockIcon />}>Google Authenticator</Button>
				<Button startIcon={<PhoneIcon />}>SMS or Phone Call</Button>
				<Button startIcon={<EmailIcon />}>Email</Button>
				<Button startIcon={<UsbIcon />}>Security Key</Button>
			</Stack>
		</WidgetContent>
	);
};

export default Selector;
