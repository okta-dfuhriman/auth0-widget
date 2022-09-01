import React from 'react';
import { Avatar, Stack, Typography, TypographyTypeMap } from '@mui/material';

import { useWidgetState } from '../../hooks';

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

	console.log(logo);

	const { title, noLogo = false, content, children, stackSx } = props;

	const _content =
		typeof content === 'string' ? (
			<Typography align='center' sx={{ pb: 3 }}>
				{content}
			</Typography>
		) : (
			content
		);

	const _logo =
		logo && typeof logo !== 'string' ? (
			logo
		) : (
			<img src={logo} alt='logo' style={{ width: '50%' }} />
		);

	return (
		<>
			{!noLogo && _logo}
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
