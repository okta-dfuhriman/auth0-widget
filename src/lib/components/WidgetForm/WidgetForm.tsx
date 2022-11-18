import React from 'react';
import { Stack } from '@mui/material';

import type { StackProps } from '@mui/material';

interface WidgetFormProps extends StackProps {}

const WidgetForm = ({ children }: WidgetFormProps) => {
	return (
		<Stack
			id='widget-form'
			justifyContent='space-between'
			rowGap={4}
			sx={{
				flexGrow: 1,
				px: 3,
				width: '100%',
				marginTop: '0px !important',
			}}
			alignItems='center'
		>
			{children}
		</Stack>
	);
};

export default WidgetForm;
