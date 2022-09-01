import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Stack, Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import { Checkmark } from 'react-checkmark';

import { WidgetContent } from '../../components';
import { useWidgetState } from '../../hooks';

const EmailVerify = () => {
	const { isLoading, sendMagicLink, loginHint, goTo } = useWidgetState();

	const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () =>
		sendMagicLink(loginHint);

	return (
		<WidgetContent title='Link Sent!' noLogo content='' stackSx={{ mt: 8 }}>
			<Stack sx={{ width: '100%' }} rowGap={3}>
				<Checkmark size='xxLarge' />
				<Typography textAlign='center'>
					A login link has been sent to{' '}
					{loginHint || 'your email address'}.
				</Typography>
			</Stack>
			<Stack spacing={2} sx={{ width: '100%' }}>
				<Button
					variant='contained'
					size='large'
					fullWidth
					disabled={isLoading}
					onClick={handleSubmit}
					endIcon={<LoopIcon />}
				>
					Resend
				</Button>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Button
						variant='text'
						disableFocusRipple
						disableTouchRipple
						disableRipple
						size='small'
						component='a'
						onClick={() => goTo('email')}
						sx={{
							'&.MuiButton-root': {
								textTransform: 'unset',
							},
							m: 0,
							p: 0,
						}}
					>
						Start Over
					</Button>
				</Box>
			</Stack>
		</WidgetContent>
	);
};

export default EmailVerify;
