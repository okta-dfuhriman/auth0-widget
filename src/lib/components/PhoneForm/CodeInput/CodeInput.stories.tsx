import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import CodeInput from './index';

export default {
	title: 'Inputs/Code Input',
	component: CodeInput,
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
} as ComponentMeta<typeof CodeInput>;

const Template: ComponentStory<typeof CodeInput> = (args) => (
	<CodeInput {...args} />
);

export const Default = Template.bind({});

export const WithInput = Template.bind({});
WithInput.args = {
	value: '123456',
};

export const Interactive: ComponentStory<typeof CodeInput> = (args) => {
	const [{ value }, updateArgs] = useArgs();

	return (
		<CodeInput
			{...args}
			onChange={({ target: { value } }) => updateArgs({ value })}
			value={value}
		/>
	);
};
