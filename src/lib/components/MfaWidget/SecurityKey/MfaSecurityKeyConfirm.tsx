import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { Usb as UsbIcon } from '@mui/icons-material';

import WidgetContent from '../../WidgetContent/WidgetContent';

export interface MfaSecurityKeyConfirmProps {
	isLoading?: boolean;
}

const MfaSecurityKeyConfirm = (props: MfaSecurityKeyConfirmProps) => {
	const { isLoading } = props;
	return (
		<WidgetContent
			title='Allow using your Security Key?'
			content='Connect your Security Key to your device. If your key has a button or touch indicator, tap it now.'
		>
			<UsbIcon sx={{ fontSize: 128 }} />
			<MuiButton variant='text' size='small' fullWidth>
				Use your Security Key with Bluetooth instead
			</MuiButton>
		</WidgetContent>
	);
};

MfaSecurityKeyConfirm.defaultProps = {
	isLoading: false,
};

export default MfaSecurityKeyConfirm;
