import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Paper, Stack } from '@mui/material';

import { useVerifyMagicLink, useWidgetState } from '../../hooks';
import initFontAwesome from '../../utils/initFontAwesome';
import {
	EmailPassword,
	EmailVerify,
	IdentifierFirst,
	ProgressiveCapture,
} from '../../screens';
import {
	PageLoader,
	WidgetForm,
	WidgetHeader,
	WidgetTitle,
} from '../../components';

export interface WidgetProps {
	children?: React.ReactNode;
}

const Widget = ({ children }: WidgetProps) => {
	initFontAwesome();

	const location = useLocation();
	const navigate = useNavigate();

	const [queryParams, setQueryParams] = React.useState<
		URLSearchParams | undefined
	>();

	const { flow, isLoading, isLoadingAuth } = useWidgetState();
	const { isLoading: isLoadingVerify, mutation: verifyMagicLink } =
		useVerifyMagicLink();

	React.useEffect(() => {
		let isMounted = true;

		if (isMounted && location?.hash) {
			setQueryParams(new URLSearchParams(location.hash.substring(1)));
		} else if (isMounted && location?.search) {
			setQueryParams(new URLSearchParams(location.search));
		}

		return () => {
			isMounted = false;
		};
	}, [location]);

	React.useEffect(() => {
		let isMounted = true;

		if (
			isMounted &&
			!isLoadingVerify &&
			!isLoadingAuth &&
			!isLoading &&
			queryParams?.has('verification_code')
		) {
			navigate('/passwordless/verify_redirect', { replace: true });

			const code = queryParams.get('verification_code') || undefined;
			const redirectUri = queryParams.get('redirect_uri') || undefined;
			const email = queryParams.get('email') || undefined;
			const phone = queryParams.get('phone') || undefined;

			if (isMounted && code) {
				verifyMagicLink.mutate({ code, redirectUri, email, phone });
			}
		}

		return () => {
			if (isMounted) {
				setQueryParams(undefined);
			}
			isMounted = false;
		};
	}, [isLoadingVerify, isLoadingAuth, isLoading, queryParams]);

	return (
		<>
			{(isLoading || isLoadingAuth || isLoadingVerify) && <PageLoader />}
			{!(isLoading || isLoadingAuth || isLoadingVerify) && (
				<Container id='widget-container' maxWidth={false}>
					<Paper
						elevation={3}
						sx={{
							display: 'flex',
							minHeight: 600,
							py: 3,
							px: 1,
						}}
					>
						<Stack
							id='widget'
							spacing={3}
							direction='column'
							alignItems='center'
							sx={{ flexGrow: 1, pb: 3, width: '100%' }}
						>
							<WidgetHeader />
							<WidgetTitle />
							<WidgetForm>
								{['sms', 'email'].includes(flow) && (
									<IdentifierFirst />
								)}
								{flow === 'password' && <EmailPassword />}
								{flow === 'email-verify' && <EmailVerify />}
								{/* {flow === 'progressive' && <ProgressiveCapture />} */}
								{children}
							</WidgetForm>
						</Stack>
					</Paper>
				</Container>
			)}
		</>
	);
};

export default Widget;
