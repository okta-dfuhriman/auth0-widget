import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { parsePhoneNumber } from 'awesome-phonenumber';

import type { AsYouType, PhoneNumber } from 'awesome-phonenumber';
import type { OutlinedTextFieldProps } from '@mui/material/TextField';

import CodeInput from './CodeInput';
import PhoneInput, { formatter, formatPhoneNumber } from './PhoneInput';
import CountrySelector from './CountrySelector';
import { useSendMagicLink, useWidgetState } from '../../hooks';
import { LoadingButton } from '../../components';

export interface PhoneFormProps
	extends Omit<OutlinedTextFieldProps, 'variant'> {
	actions?: React.ReactNode;
	formType?: 'input' | 'code';
	icon?: boolean | React.ReactNode;
}

const PhoneForm = (props: PhoneFormProps) => {
	const { actions, formType = 'input', icon } = props;

	const { loginHint } = useWidgetState();

	const { mutation: sendMagicLink, isLoading } = useSendMagicLink();

	const [country, setCountry] = React.useState('US');
	const [formattedPhoneNumber, setFormattedPhoneNumber] =
		React.useState<string>('');
	const [phoneNumber, setPhoneNumber] = React.useState<PhoneNumber>();
	const [_formatter, createFormatter] = React.useState<
		AsYouType | undefined
	>();
	const [mfaCode, setMfaCode] = React.useState('');
	const [isCodeInput] = React.useState(formType === 'code');
	const [errorText, setErrorText] = React.useState<string | undefined>();
	const [isError, setIsError] = React.useState<boolean>(false);

	React.useEffect(() => {
		if (country) {
			createFormatter(() => formatter(country));
		}
	}, [country]);

	React.useEffect(() => {
		if (!formattedPhoneNumber && loginHint && country) {
			setPhoneNumber(parsePhoneNumber(loginHint, country));
		}
	}, [loginHint]);

	const validateInput = (allowBlank: boolean = false) => {
		if (!phoneNumber && !allowBlank) {
			setErrorText('Please enter your phone number');
			setIsError(true);
		} else {
			setErrorText('');
			setIsError(false);
		}
	};

	const onChangeNumber: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		const { data } = event?.nativeEvent as CompositionEvent;

		const value = data || event?.target?.value;

		if (_formatter) {
			const formattedNumber = formatPhoneNumber(_formatter, value);

			const number = _formatter.getPhoneNumber();

			setPhoneNumber(number);

			if (formattedNumber || formattedNumber === '') {
				validateInput();
				setFormattedPhoneNumber(formattedNumber);
			}
		}
	};

	const onChangeCode = (event: { target: { value: any } }) =>
		setMfaCode(event.target.value);

	const onSelect = (event: { target: { value: any } }) =>
		setCountry(event.target.value);

	const onBlur = () => validateInput(true);

	const onKeyPress: React.KeyboardEventHandler<HTMLDivElement> = ({
		key,
	}) => {
		if (key === 'Enter') {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		if (!isError && phoneNumber) {
			const {
				number: { e164 },
				valid,
			} = phoneNumber.toJSON();

			if (!valid) {
				setErrorText('Phone number is not valid!');
				setIsError(true);
			} else if (e164) {
				sendMagicLink.mutate({ phoneNumber: e164 });
			}
		}
	};

	return (
		<>
			<Box sx={{ width: '100%' }}>
				{!isCodeInput && (
					<CountrySelector onChange={onSelect} value={country} />
				)}
				<PhoneInput
					onChange={onChangeNumber}
					value={formattedPhoneNumber}
					disabled={isCodeInput}
					helperText={errorText}
					error={!!errorText}
					{...{ icon, onBlur, onKeyPress }}
				/>
				{isCodeInput && (
					<>
						<CodeInput onChange={onChangeCode} value={mfaCode} />
						<Typography align='center' sx={{ py: 3 }}>
							Didn't receive a call? Tough luck!
						</Typography>
					</>
				)}
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
					Continue with SMS
				</LoadingButton>
				{actions}
			</Stack>
		</>
	);
};

export default PhoneForm;
