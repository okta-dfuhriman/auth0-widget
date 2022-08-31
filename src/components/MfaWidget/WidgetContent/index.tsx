import React from 'react';
import { Stack, Typography, TypographyTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import type { StackProps } from '@mui/material';

export interface WidgetContentProps {
	title?: string;
	content: string | OverridableComponent<TypographyTypeMap>;
	children?: StackProps['children'];
}

const WidgetContent = (props: WidgetContentProps) => {
	const { title, content, children } = props;

	const _content =
		typeof content === 'string' ? (
			<Typography align='center' sx={{ pb: 3 }}>
				{content}
			</Typography>
		) : (
			content
		);

	return (
		<Stack sx={{ flexGrow: 1, px: 3 }}>
			<Typography variant='h5' align='center' sx={{ pb: 3 }}>
				{title}
			</Typography>
			{_content}
			<Stack justifyContent='space-between' sx={{ flexGrow: 1 }} alignItems='center'>
				{children}
			</Stack>
		</Stack>
	);
};

WidgetContent.defaultProps = {
	title: 'Secure Your Account',
};

export default WidgetContent;
