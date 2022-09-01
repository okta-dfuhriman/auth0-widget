import React from 'react';
import { Box, Button, Divider, Stack } from '@mui/material';
import { Apple as AppleIcon } from '@mui/icons-material';

import { EmailInput, LoginButton, WidgetContent } from '../../components';
import { useWidgetState } from '../../hooks';

const IdentifierFirst = () => {
	const { isLoading, goTo, sendMagicLink, loginHint } = useWidgetState();
	const [emailValue, setEmailValue] =
		React.useState<string | undefined>(loginHint);

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		const { value } = target;

		if (value || value === '') {
			setEmailValue(value);
		}
	};

	const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = ({
		key,
	}) => {
		if (key === 'Enter') {
			sendMagicLink(emailValue);
		}
	};

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () =>
		sendMagicLink(emailValue);

	return (
		<WidgetContent
			title='Welcome'
			content='Enter your email address to continue'
		>
			<Box sx={{ width: '100%' }}>
				<EmailInput
					fullWidth
					value={emailValue}
					onChange={handleInputChange}
					onKeyDown={onKeyPress}
				/>
			</Box>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<Button
					variant='contained'
					size='large'
					fullWidth
					disabled={isLoading}
					onClick={handleSubmit}
				>
					Continue
				</Button>

				<Box>
					<Divider flexItem>or</Divider>
				</Box>
				<LoginButton variant='google' />
				<LoginButton variant='apple' />
				{/* <Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography variant='body2'>
						Don't have an account?
					</Typography>
					<Button
						variant='text'
						disableFocusRipple
						disableTouchRipple
						disableRipple
						size='small'
						component='a'
						onClick={() => goTo('signup')}
						sx={{
							'&.MuiButton-root': {
								textTransform: 'unset',
							},
							m: 0,
							p: 0,
						}}
					>
						Sign Up
					</Button>
				</Box> */}
			</Stack>
		</WidgetContent>
	);
};

IdentifierFirst.defaultProps = {
	isLoading: false,
	verify: false,
};

export default IdentifierFirst;
