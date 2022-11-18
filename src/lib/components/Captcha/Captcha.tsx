import React from 'react';
import { Box, useTheme } from '@mui/material';

import { useWidgetState } from '../../hooks';

const Captcha = () => {
	const theme = useTheme();
	const { error, renderCaptcha } = useWidgetState();

	React.useEffect(() => {
		const captchaContainer = document.querySelector(
			'.captcha-container'
		) as HTMLElement;

		if (import.meta.env.MODE === 'production' && captchaContainer) {
			renderCaptcha(captchaContainer);
		} else {
			captchaContainer.innerHTML = 'This is a captcha box';
			captchaContainer.style.border = '2px solid #000000';
			captchaContainer.style.height = '36px';
		}
	}, []);

	React.useEffect(() => {
		const _captchaContainer: HTMLElement | undefined =
			document.querySelector('.captcha-container') as HTMLElement;

		if (error?.name === 'invalid_captcha' && _captchaContainer) {
			_captchaContainer.style.border = `2px solid ${theme.palette.error.main}`;
		}
	}, [error?.name]);

	return (
		<Box
			id='captcha-container'
			className='captcha-container'
			sx={{ width: '100%' }}
		></Box>
	);
};

export default Captcha;
