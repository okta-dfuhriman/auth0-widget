import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import PhoneForm from './index';

export default {
	title: 'Phone Form',
	component: PhoneForm,
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
		formType: 'input',
	},
} as ComponentMeta<typeof PhoneForm>;

const Template: ComponentStory<typeof PhoneForm> = (args) => (
	<PhoneForm {...args} />
);

export const Default = Template.bind({});

export const WithInput = Template.bind({});
WithInput.args = {
	value: '(555) 555-1234',
};

export const Interactive: ComponentStory<typeof PhoneForm> = (args) => {
	const [{ value }, updateArgs] = useArgs();

	return (
		<PhoneForm
			{...args}
			onChange={({ target: { value } }) => updateArgs({ value })}
			value={value}
		/>
	);
};
