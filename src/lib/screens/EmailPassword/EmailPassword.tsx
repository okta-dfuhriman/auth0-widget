import React from 'react';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

import {
	Captcha,
	EmailInput,
	LoadingButton,
	LoginButton,
	PasswordInput,
} from '../../components';
import { useSendMagicLink, useWidgetState } from '../../hooks';

const EmailPassword = () => {
	const { goTo, loginWithPassword, loginHint: email } = useWidgetState();
	const { mutation: sendMagicLink } = useSendMagicLink();
	const [passwordValue, setPasswordValue] = React.useState<string>('');
	const [isError, setIsError] = React.useState<boolean>(false);
	const [errorText, setErrorText] = React.useState<string | undefined>();

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		const { value } = target;

		if (value || value === '') {
			setPasswordValue(value);
		}
	};

	const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = ({
		key,
	}) => {
		if (key === 'Enter' && !isError) {
			loginWithPassword({ email, password: passwordValue });
		}
	};

	const validateInput = (allowBlank: boolean = false) => {
		if (!passwordValue && !allowBlank) {
			setIsError(true);
			setErrorText('Please enter your password');
		} else {
			setIsError(false);
			setErrorText('');
		}
	};

	const onBlur = () => validateInput(true);

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
		validateInput();
		if (!isError) loginWithPassword({ email, password: passwordValue });
	};

	const emailDisabled = email || email !== '' ? true : false;
	const emailOnClick = emailDisabled ? () => goTo('email') : undefined;

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<EmailInput
					fullWidth
					value={email}
					disabled={emailDisabled}
					ButtonProps={{ onClick: emailOnClick }}
				/>
				<PasswordInput
					id='password'
					value={passwordValue}
					onKeyDown={onKeyPress}
					onChange={handleInputChange}
					required
					helperText={errorText}
					error={isError}
					{...{ onBlur }}
				/>
			</Box>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<Captcha />
				<LoadingButton
					variant='contained'
					size='large'
					fullWidth
					// disabled={isLoading}
					// loading={isLoading}
					onClick={handleSubmit}
				>
					Continue
				</LoadingButton>

				<Box id='button-divider'>
					<Divider flexItem>or</Divider>
				</Box>
				<LoginButton variant='google' />
				{/* <LoginButton variant='apple' /> */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Typography variant='body2'>
						Don't have a password?
					</Typography>
					<Button
						variant='text'
						disableFocusRipple
						disableTouchRipple
						disableRipple
						size='small'
						component='a'
						onClick={() => sendMagicLink.mutate({ email })}
						sx={{
							'&.MuiButton-root': {
								textTransform: 'unset',
							},
							minHeight: '1rem',
						}}
					>
						Sign In with Email
					</Button>
				</Box>
			</Stack>
		</>
	);
};

export default EmailPassword;
