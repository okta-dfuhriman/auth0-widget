import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import PhoneInput, { formatter, formatPhoneNumber } from './index';

export default {
	title: 'Inputs/Phone Input',
	component: PhoneInput,
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
} as ComponentMeta<typeof PhoneInput>;

const Template: ComponentStory<typeof PhoneInput> = (args) => (
	<PhoneInput {...args} />
);

export const Default = Template.bind({});

export const WithInput = Template.bind({});
WithInput.args = {
	value: '(555) 555-1234',
};

export const Interactive: ComponentStory<typeof PhoneInput> = (args) => {
	const [{ value }, updateArgs] = useArgs();
	const [_formatter] = React.useState(formatter('US'));

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		event.preventDefault();

		const { data } = event?.nativeEvent as CompositionEvent;

		if (_formatter) {
			updateArgs({ value: formatPhoneNumber(_formatter, data) });
		}
	};

	return <PhoneInput {...args} onChange={handleChange} value={value} />;
};
