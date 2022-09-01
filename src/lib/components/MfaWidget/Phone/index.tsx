import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Stack } from '@mui/material';

import PhoneForm from '../../PhoneForm/PhoneForm';
import WidgetContent from '../../WidgetContent/WidgetContent';

export interface PhoneWidgetProps {
	isLoading?: boolean;
	verify?: boolean;
	value?: string;
}

const Phone = (props: PhoneWidgetProps) => {
	const { isLoading, verify, value } = props;

	return (
		<WidgetContent content='Enter your country code and a phone number where we can send a 6-digit code.'>
			<Box>
				<PhoneForm formType={verify ? 'code' : 'input'} value={value} />
			</Box>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<LoadingButton
					variant='contained'
					size='large'
					fullWidth
					loading={isLoading}
				>
					{isLoading ? 'Sending code' : 'Continue'}
				</LoadingButton>
				<Button variant='text' size='small' fullWidth>
					Try another method
				</Button>
			</Stack>
		</WidgetContent>
	);
};

Phone.defaultProps = {
	isLoading: false,
	verify: false,
};

export default Phone;
