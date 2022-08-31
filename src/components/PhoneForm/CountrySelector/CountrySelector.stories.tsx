import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import CountrySelector from './index';

export default {
	title: 'Inputs/Country Selector',
	component: CountrySelector,
	argTypes: {
		onChange: { action: 'changed', table: { disable: true } },
		hiddenLabel: {
			table: { disable: true },
		},
		ref: {
			table: { disable: true },
		},
	},
	args: {
		margin: 'normal',
	},
} as ComponentMeta<typeof CountrySelector>;

const Template: ComponentStory<typeof CountrySelector> = (args) => <CountrySelector {...args} />;

export const Default = Template.bind({});

export const NoSelection = Template.bind({});
NoSelection.args = {
	value: '',
};

export const Interactive: ComponentStory<typeof CountrySelector> = (args) => {
	const [{ value }, updateArgs] = useArgs();

	return <CountrySelector {...args} onChange={({ target: { value } }) => updateArgs({ value })} value={value} />;
};
