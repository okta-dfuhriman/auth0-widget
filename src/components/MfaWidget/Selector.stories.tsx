import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MfaWidget from './index';

export default {
	title: 'MFA Widget/Selector',
	component: MfaWidget,
	argTypes: {
		hiddenLabel: {
			table: { disable: true },
		},
		ref: {
			table: { disable: true },
		},
		authenticator: {
			control: false,
		},
		step: {
			table: {
				disable: true,
			},
		},
		inputValue: {
			table: {
				disable: true,
			},
		},
	},
	args: {
		title: 'Secure Your Account',
	},
} as ComponentMeta<typeof MfaWidget>;

export const Selector: ComponentStory<typeof MfaWidget> = (args) => <MfaWidget {...args} />;
