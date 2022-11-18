import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import PasswordInput from './index';

export default {
	title: 'Inputs/Email Input',
	component: PasswordInput,
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
} as ComponentMeta<typeof PasswordInput>;

const Template: ComponentStory<typeof PasswordInput> = (args) => (
	<PasswordInput {...args} />
);

export const Default = Template.bind({});

export const WithInput = Template.bind({});
WithInput.args = {
	value: 'user@atko.email',
};

export const Interactive: ComponentStory<typeof PasswordInput> = (args) => {
	const [{ value }, updateArgs] = useArgs();

	return (
		<PasswordInput
			{...args}
			onChange={({ target: { value } }) => updateArgs({ value })}
			value={value}
		/>
	);
};
