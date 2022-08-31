import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MfaWidget from './index';

export default {
	title: 'MFA Widget/Phone',
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

const Template: ComponentStory<typeof MfaWidget> = (args) => <MfaWidget {...args} />;

export const SMS = Template.bind({});
SMS.args = {
	authenticator: 'sms',
};

export const SMS_Verify = Template.bind({});
SMS_Verify.args = {
	authenticator: 'sms-verify',
	inputValue: '(555) 555-1234',
};
