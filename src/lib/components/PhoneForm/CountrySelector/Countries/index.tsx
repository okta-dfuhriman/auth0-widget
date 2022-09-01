import { CountryCodes } from '../FlagIcon';

export type Country = {
	name: string;
	value: string;
	code: CountryCodes;
};

export type Countries = Country[];

export const CountriesList: Countries = [
	{
		name: 'Australia',
		value: '+61',
		code: 'AUS',
	},
	{
		name: 'Canada',
		value: '+1',
		code: 'CA',
	},
	{
		name: 'Mexico',
		value: '+52',
		code: 'MX',
	},
	{
		name: 'Switzerland',
		value: '+41',
		code: 'CH',
	},
	{
		name: 'United Kingdom',
		value: '+44',
		code: 'UK',
	},
	{
		name: 'United States',
		value: '+1',
		code: 'US',
	},
];

export default Countries;
