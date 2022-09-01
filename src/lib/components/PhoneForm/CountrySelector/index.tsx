import React from 'react';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import TextField, { StandardTextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import FlagIcon from './FlagIcon';
import { CountriesList } from './Countries';

export * from './Countries';

export interface CountrySelectorProps extends StandardTextFieldProps {}

const CountrySelectorRoot = styled(TextField)(() => ({
	'& .MuiInput-input': {
		display: 'flex',
		alignItems: 'center',
	},
	'& .MuiListItemIcon-root': {
		minWidth: 'unset',
		height: '24px',
		padding: '0px 8px 0px 4px',
	},
}));

const CountrySelector = (props: CountrySelectorProps) => (
	<CountrySelectorRoot {...props}>
		{CountriesList.map(({ code, value, name }) => (
			<MenuItem key={code} value={code}>
				<ListItemIcon sx={{ pr: 1 }}>
					<FlagIcon country={code} />
				</ListItemIcon>
				<ListItemText>{`${name}, ${code}, ${value}`}</ListItemText>
			</MenuItem>
		))}
	</CountrySelectorRoot>
);

CountrySelector.defaultProps = {
	id: 'country-selector',
	fullWidth: true,
	label: '',
	margin: 'normal',
	required: true,
	select: true,
	value: 'US',
	variant: 'standard',
};

export default CountrySelector;
