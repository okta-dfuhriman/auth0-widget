import React from 'react';
import { Container, CircularProgress } from '@mui/material';

const PageLoader = () => {
	return (
		<Container sx={{ display: 'flex', justifyContent: 'center' }}>
			<CircularProgress size={128} />
		</Container>
	);
};

export default PageLoader;
