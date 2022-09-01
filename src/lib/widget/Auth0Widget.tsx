import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Widget } from '../components';
import initFontAwesome from '../utils/initFontAwesome';

import type { AuthOptions } from 'auth0-js';

import { WidgetStateProvider } from '../providers';
import { createTheme } from './theme';

import './style.css';

import type { PaletteColorOptions, Theme } from '@mui/material';

export interface WidgetTheme {
	primaryColor?: PaletteColorOptions;
	secondaryColor?: PaletteColorOptions;
	logo?: string;
}

export interface Auth0WidgetProps {
	authOptions: AuthOptions;
	flow?: 'email' | 'email-verify' | 'sms' | 'mfa' | undefined;
	widgetTheme?: WidgetTheme;
}

const Auth0Widget = ({
	authOptions,
	flow = 'email',
	widgetTheme,
}: Auth0WidgetProps) => {
	initFontAwesome();

	const {
		redirectUri = `${window.location.origin}`,
		responseType: _responseType,
	} = authOptions || {};

	// const responseType = ['email', 'sms'].includes(flow)
	// 	? 'token id_token'
	// 	: _responseType;

	const theme = createTheme(widgetTheme || {});

	return (
		<ThemeProvider {...{ theme }}>
			<WidgetStateProvider
				{...{
					authOptions: { ...authOptions, redirectUri },
					flow,
					logo: widgetTheme?.logo,
				}}
			>
				<Widget />
			</WidgetStateProvider>
		</ThemeProvider>
	);
};

export default Auth0Widget;
