import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import EmailInput from './index';

export default {
	title: 'Inputs/Email Input',
	component: EmailInput,
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
} as ComponentMeta<typeof EmailInput>;

const Template: ComponentStory<typeof EmailInput> = (args) => <EmailInput {...args} />;

export const Default = Template.bind({});

export const WithInput = Template.bind({});
WithInput.args = {
	value: 'user@atko.email',
};

export const Interactive: ComponentStory<typeof EmailInput> = (args) => {
	const [{ value }, updateArgs] = useArgs();

	return <EmailInput {...args} onChange={({ target: { value } }) => updateArgs({ value })} value={value} />;
};
