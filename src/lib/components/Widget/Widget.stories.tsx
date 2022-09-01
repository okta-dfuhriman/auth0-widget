import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Widget from './Widget';

export default {
	title: 'Widget',
	component: Widget,
	argTypes: {
		hiddenLabel: {
			table: { disable: true },
		},
		ref: {
			table: { disable: true },
		},
	},
} as ComponentMeta<typeof Widget>;

export const Container: ComponentStory<typeof Widget> = () => <Widget />;
