import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps } from '@mui/material';

export interface SelectorButtonProps {
	children?: ButtonProps['children'] | string;
	startIcon?: any;
}

const SelectorButton = ({ children, ...props }: SelectorButtonProps) => (
	<MuiButton
		variant='outlined'
		size='large'
		fullWidth
		sx={{ justifyContent: 'flex-start' }}
		{...props}
	>
		{children}
	</MuiButton>
);

export default SelectorButton;
