import React from 'react';
import { AUS, CA, CH, GB, MX, US } from './flags';

export type CountryCodes = 'AUS' | 'CA' | 'CH' | 'UK' | 'MX' | 'US';

export type FlagIconProps = {
	country: CountryCodes;
};

const FlagIcon = ({ country }: FlagIconProps) => {
	let flag;

	switch (country) {
		case 'AUS':
			flag = AUS;
			break;
		case 'CA':
			flag = CA;
			break;
		case 'CH':
			flag = CH;
			break;
		case 'UK':
			flag = GB;
			break;
		case 'MX':
			flag = MX;
			break;
		case 'US':
		default:
			flag = US;
			break;
	}
	return (
		<object
			id='country-flag'
			type='image/svg+xml'
			data={`data:image/svg+xml,${flag}`}
		/>
	);
};

FlagIcon.defaultProps = {
	country: 'US',
};

export default FlagIcon;
