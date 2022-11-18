import * as React from 'react';
import { Box, Stack } from '@mui/material';
import type { ButtonProps, OutlinedTextFieldProps } from '@mui/material';

import { useSendMagicLink, useWidgetState } from '../../hooks';
import { EmailInput, LoadingButton } from '../../components';

export interface EmailFormProps
	extends Omit<OutlinedTextFieldProps, 'onSubmit' | 'onClick' | 'variant'> {
	onClick?: ButtonProps['onClick'];
	value?: string;
	actions?: React.ReactNode;
}

const EmailForm = (props: EmailFormProps) => {
	const { actions, value = '', onClick } = props;

	const { loginHint } = useWidgetState();
	const { mutation: sendMagicLink, isLoading } = useSendMagicLink();

	const [emailValue, setEmailValue] = React.useState<string>(value);
	const [errorText, setErrorText] = React.useState<string | undefined>();
	const [isError, setIsError] = React.useState<boolean>(false);

	React.useEffect(() => {
		let isMounted = true;

		if (isMounted && (!emailValue || emailValue === '') && loginHint) {
			setEmailValue(loginHint);
		}

		return () => {
			isMounted = false;
		};
	}, [loginHint]);

	const validateInput = (allowBlank: boolean = false) => {
		if (!emailValue && !allowBlank) {
			setErrorText('Please enter your email');
			setIsError(true);
		} else {
			setErrorText('');
			setIsError(false);
		}
	};

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = ({
		target,
	}) => {
		const { value } = target;

		if (value || value === '') {
			validateInput();
			setEmailValue(value);
		}
	};

	const onBlur = () => validateInput(true);

	const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = ({
		key,
	}) => {
		if (key === 'Enter') {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		validateInput();
		if (!isError) {
			sendMagicLink.mutate({ email: emailValue });
		}
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<EmailInput
					fullWidth
					value={emailValue}
					onChange={handleInputChange}
					onKeyDown={onKeyPress}
					required
					disabled={isLoading}
					ButtonProps={{ onClick }}
					{...{
						onBlur,
						helperText: errorText,
						error: !!errorText,
					}}
				/>
			</Box>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<LoadingButton
					variant='contained'
					size='large'
					fullWidth
					disabled={isLoading}
					loading={isLoading}
					onClick={() => handleSubmit()}
				>
					Continue with Email
				</LoadingButton>
				{actions}
			</Stack>
		</>
	);
};

export default EmailForm;
