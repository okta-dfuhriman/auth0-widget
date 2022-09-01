import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Widget from '../Widget';
import MfaWidget from './index';

export default {
	title: 'Widget/MFA/Phone',
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

const Template: ComponentStory<typeof MfaWidget> = (args) => (
	<Widget>
		<MfaWidget {...args} />
	</Widget>
);

export const SMS = Template.bind({});
SMS.args = {
	authenticator: 'sms',
};

export const SMS_Verify = Template.bind({});
SMS_Verify.args = {
	authenticator: 'sms-verify',
	inputValue: '(555) 555-1234',
};
