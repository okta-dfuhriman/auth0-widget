import * as React from 'react';
import { Typography } from '@mui/material';
import { StandardTextFieldProps } from '@mui/material/TextField';
import { getAsYouType, AsYouType } from 'awesome-phonenumber';

import CodeInput from './CodeInput';
import PhoneInput, { formatter, formatPhoneNumber } from './PhoneInput';
import CountrySelector from './CountrySelector';

export interface PhoneFormProps extends StandardTextFieldProps {
	formType: 'input' | 'code';
}

// const formatter = (code: string) => getAsYouType(code);

const PhoneForm = (props: PhoneFormProps) => {
	const { formType, onChange, value } = props;

	const [country, setCountry] = React.useState('US');
	const [phoneNumber, setPhoneNumber] = React.useState(value);
	const [_formatter, createFormatter] = React.useState<AsYouType | undefined>();
	const [mfaCode, setMfaCode] = React.useState('');
	const [isCodeInput] = React.useState(formType === 'code');

	React.useEffect(() => {
		if (country) {
			createFormatter(() => formatter(country));
		}
	}, [country]);

	const onChangeNumber: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		event.preventDefault();

		const { data } = event?.nativeEvent as CompositionEvent;

		if (_formatter) {
			const formattedNumber = formatPhoneNumber(_formatter, data);

			const {
				number: { e164 },
			} = _formatter.getPhoneNumber().toJSON();

			setPhoneNumber(formattedNumber);

			if (onChange) {
				onChange({ target: { value: e164 } } as React.ChangeEvent<HTMLInputElement>);
			}
		}
	};

	const onChangeCode = (event: { target: { value: any } }) => setMfaCode(event.target.value);

	const onSelect = (event: { target: { value: any } }) => setCountry(event.target.value);

	return (
		<>
			{!isCodeInput && <CountrySelector onChange={onSelect} value={country} />}
			<PhoneInput onChange={onChangeNumber} value={phoneNumber} disabled={isCodeInput} />
			{isCodeInput && (
				<>
					<CodeInput onChange={onChangeCode} value={mfaCode} />
					<Typography align='center' sx={{ py: 3 }}>
						Didn't receive a call? Tough luck!
					</Typography>
				</>
			)}
		</>
	);
};

PhoneForm.defaultProps = {
	formType: 'input',
};

export default PhoneForm;
