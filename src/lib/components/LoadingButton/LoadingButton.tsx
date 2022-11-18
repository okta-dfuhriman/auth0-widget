import React from 'react';
import MuiLoadingButton from '@mui/lab/LoadingButton';
import { CircularProgress, useTheme } from '@mui/material';

import type { LoadingButtonProps } from '@mui/lab/LoadingButton';

const LoadingButton = (props: LoadingButtonProps) => {
	const theme = useTheme();

	return (
		<MuiLoadingButton
			sx={{
				'&.MuiLoadingButton-root': {
					borderRadius: '0px !important',
					minHeight: '48px !important',
					textTransform: 'none',
				},
				'&.MuiButton-contained': {
					backgroundColor: `${theme.palette.primary.main} !important`,
					color: '#ffffff !important',
					'&:disabled': {
						color: `${theme.palette.action.disabled} !important`,
						boxShadow: 'none',
						backgroundColor: `${theme.palette.action.disabledBackground} !important`,
					},
					'&:hover': {
						backgroundColor: '#051131 !important',
						boxShadow: 'unset !important',
					},
				},
				'&.MuiButton-outlined': {
					color: `${theme.palette.primary.main}`,
					borderColor: `${theme.palette.primary.main}`,
					'&:disabled': {
						color: `${theme.palette.action.disabled} !important`,
						borderColor: `${theme.palette.action.disabled} !important`,
					},
				},
			}}
			loadingIndicator={<CircularProgress color='primary' size={24} />}
			{...props}
		/>
	);
};
export default LoadingButton;
