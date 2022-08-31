import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button as MuiButton, Container, List, ListItem, Stack } from '@mui/material';

import WidgetContent from '../WidgetContent';

interface MfaSecurityKeyStartProps {
	isLoading?: boolean;
}

const MfaSecurityKeyStart = (props: MfaSecurityKeyStartProps) => {
	const { isLoading } = props;
	return (
		<WidgetContent
			title='Adding your Security Key'
			content='Security Keys can be used as an additional authentication factor.'
		>
			<Stack spacing={8} justifyContent='space-between'>
				<Container disableGutters sx={{ pl: 3 }}>
					<List component='ol' sx={{ listStyle: 'ordered', fontSize: 'small', p: 0 }}>
						<ListItem sx={{ display: 'list-item' }} disableGutters>
							Connect your Security Key and continue.
						</ListItem>
						<ListItem sx={{ display: 'list-item' }} disableGutters>
							Follow the instructions in the browser.
						</ListItem>
						<ListItem sx={{ display: 'list-item' }} disableGutters>
							Name your Security Key to more easily identify it later.
						</ListItem>
					</List>
				</Container>
				<Stack spacing={2}>
					<LoadingButton variant='contained' size='large' fullWidth loading={isLoading}>
						{isLoading ? 'Waiting for Security Key' : 'Continue'}
					</LoadingButton>
					<MuiButton variant='text' size='small' fullWidth>
						Try another method
					</MuiButton>
				</Stack>
			</Stack>
		</WidgetContent>
	);
};

MfaSecurityKeyStart.defaultProps = {
	isLoading: false,
};

export default MfaSecurityKeyStart;
