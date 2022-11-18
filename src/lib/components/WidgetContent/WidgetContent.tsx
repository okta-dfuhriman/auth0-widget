import React from 'react';
import { Avatar, Stack, Typography, TypographyTypeMap } from '@mui/material';

import { useWidgetState } from '../../hooks';
import { WidgetHeader } from '../../components';

import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { StackProps, SxProps } from '@mui/material';

export interface WidgetContentProps {
	title?: string;
	noLogo?: boolean;
	content: string | OverridableComponent<TypographyTypeMap>;
	children?: StackProps['children'];
	stackSx?: SxProps;
}

const WidgetContent = (props: WidgetContentProps) => {
	const { logo } = useWidgetState();

	const { title, noLogo, content, children, stackSx } = props;

	const _content =
		typeof content === 'string' ? (
			<Typography align='center' sx={{ pb: 3 }}>
				{content}
			</Typography>
		) : (
			content
		);

	return (
		<>
			<Stack sx={{ ...stackSx, flexGrow: 1, px: 3 }}>
				<Typography variant='h5' align='center' sx={{ pb: 3 }}>
					{title}
				</Typography>
				{_content}
				<Stack
					justifyContent='space-between'
					sx={{ flexGrow: 1 }}
					alignItems='center'
				>
					{children}
				</Stack>
			</Stack>
		</>
	);
};

WidgetContent.defaultProps = {
	title: 'Secure Your Account',
};

export default WidgetContent;
