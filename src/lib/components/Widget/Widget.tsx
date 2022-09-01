import React from 'react';
import { Container, Paper, Stack } from '@mui/material';
import { useWidgetState } from '../../hooks';
import initFontAwesome from '../../utils/initFontAwesome';
import { EmailVerify, IdentifierFirst } from '../../components';

const Widget = () => {
	initFontAwesome();

	const { flow, verifyMagicLink } = useWidgetState();

	React.useEffect(() => {
		const parseHash = () => {
			const url = new URL(window.location.href);

			const hashParams = new URLSearchParams(url.hash.substring(1));

			const code = hashParams.has('verification_code')
				? hashParams.get('verification_code')
				: undefined;
			const email = hashParams.has('email')
				? hashParams.get('email')
				: undefined;
			const phone = hashParams.has('phone')
				? hashParams.get('phone')
				: undefined;

			return { code, email, phone };
		};

		if (window.location.hash && window.location.hash !== '') {
			const { code, email, phone } = parseHash();

			if (code && (email || phone)) {
				verifyMagicLink({ code, email, phone });
			}
		}
	}, [window.location.hash]);

	return (
		<Container maxWidth='xs' sx={{ width: 400 }}>
			<Paper
				elevation={3}
				sx={{ display: 'flex', minHeight: 600, py: 3, px: 1 }}
			>
				<Stack
					spacing={3}
					direction='column'
					alignItems='center'
					sx={{ flexGrow: 1, pb: 3 }}
				>
					{flow === 'email' && <IdentifierFirst />}
					{flow === 'email-verify' && <EmailVerify />}
				</Stack>
			</Paper>
		</Container>
	);
};

export default Widget;
