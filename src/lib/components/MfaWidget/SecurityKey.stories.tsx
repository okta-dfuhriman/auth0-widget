import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import MfaWidget from './index';
import Widget from '../Widget';

export default {
	title: 'Widget/MFA/Security Key',
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

export const Start = Template.bind({});
Start.args = {
	authenticator: 'webauthn-roaming',
};

export const Confirm = Template.bind({});
Confirm.args = {
	authenticator: 'webauthn-roaming',
	step: 1,
};

export const NicknameInput = Template.bind({});
NicknameInput.args = {
	authenticator: 'webauthn-roaming',
	step: 2,
	action: 'Save',
};

export const NicknameConfirm = Template.bind({});
NicknameConfirm.args = {
	authenticator: 'webauthn-roaming',
	step: 3,
};
