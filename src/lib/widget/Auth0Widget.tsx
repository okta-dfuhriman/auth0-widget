import React from 'react';
import { BrowserRouter, useInRouterContext } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, Widget } from '../components';
import initFontAwesome from '../utils/initFontAwesome';

import { WidgetStateProvider } from '../providers';
import { createTheme } from './theme';

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

import type { PaletteColorOptions } from '@mui/material';

export interface WidgetTheme {
	primaryColor?: PaletteColorOptions;
	secondaryColor?: PaletteColorOptions;
	logo?: string;
}

export interface Auth0WidgetProps {
	authOptions: Widget.AuthOptions;
	flow?: AuthFlow;
	widgetTheme?: WidgetTheme;
}

const queryClient = new QueryClient();

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

	const WidgetApp = () => (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider {...{ theme }}>
				<WidgetStateProvider
					{...{
						authOptions: {
							...authOptions,
							redirectUri,
						},
						flow: 'email',
						theme: {
							logo: widgetTheme?.logo,
						},
					}}
				>
					<ToastContainer />
					<Widget />
				</WidgetStateProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);

	if (!useInRouterContext()) {
		return (
			<BrowserRouter>
				<WidgetApp />
			</BrowserRouter>
		);
	}

	return <WidgetApp />;
};

export default Auth0Widget;
