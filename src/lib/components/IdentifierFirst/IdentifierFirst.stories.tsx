import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Widget from '../Widget';
import IdentifierFirst from './IdentifierFirst';

export default {
	title: 'Widget/Identifier First',
	component: IdentifierFirst,
	argTypes: {
		hiddenLabel: {
			table: { disable: true },
		},
		ref: {
			table: { disable: true },
		},
	},
	args: {
		title: 'Secure Your Account',
	},
} as ComponentMeta<typeof IdentifierFirst>;

export const Default: ComponentStory<typeof IdentifierFirst> = () => (
	<Widget>
		<IdentifierFirst />
	</Widget>
);
