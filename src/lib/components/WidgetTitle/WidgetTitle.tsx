import React from 'react';
import { Stack, Typography } from '@mui/material';

import { useWidgetState } from '../../hooks';

import type { StackProps } from '@mui/material';

export interface WidgetTitleProps extends StackProps {}

const WidgetTitle = ({ children, ...props }: WidgetTitleProps) => {
	const { theme } = useWidgetState() || {};

	const { title = 'Welcome', subtitle, hideLogo = false } = theme || {};

	const _title =
		title && typeof title !== 'string' ? (
			title
		) : (
			<Typography variant='h5' align='center' sx={{ pb: 3 }}>
				{title}
			</Typography>
		);

	return (
		<>
			<Stack
				{...{
					id: 'widget-title',
					sx: { flexGrow: 1, px: 3, pt: hideLogo ? 8 : 0 },
					...props,
				}}
			>
				{_title}
				{subtitle}
				{children}
			</Stack>
		</>
	);
};

export default WidgetTitle;
