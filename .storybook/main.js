module.exports = {
	stories: ['../src/**/**/*.stories.mdx', '../src/**/**/*.stories.@(js|jsx|ts|tsx)'],
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
	addons: [
		'@storybook/addon-docs',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-actions',
	],
	framework: '@storybook/react',
};
