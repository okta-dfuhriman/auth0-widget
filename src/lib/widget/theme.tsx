import { createTheme as createMuiTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';

import type { ThemeOptions } from '@mui/material';
import type { WidgetTheme } from './Auth0Widget';

export const defaultTheme: ThemeOptions = {
	palette: {
		primary: {
			main: '#001952',
		},
		secondary: {
			main: '#051131',
		},
	},
	typography: {
		fontFamily: [
			'PetcoCircular',
			'PetcoCircular-Black',
			'PetcoCircular-ExtraBlack',
			'PetcoCircular-Bold',
			'PetcoCircular-Thin',
			'PetcoCircular-Light',
		].join(','),
		button: {
			textTransform: 'none',
			fontSize: '1rem',
		},
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
				disableTouchRipple: true,
			},
			styleOverrides: {
				root: {
					':hover': {
						backgroundColor: '#051131',
						boxShadow: 'unset',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					minHeight: 48,
				},
				text: {
					':hover': {
						backgroundColor: 'unset',
						color: '#051131',
					},
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: `
				@font-face {
					font-family: PetcoCircular-Black;
					font-style: italic;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-BlackItalic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-Bold;
					font-style: normal;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-Bold.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-Bold;
					font-style: italic;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-BoldItalic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-Book;
					font-style: normal;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-Book.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-Book;
					font-style: italic;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-BookItalic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-ExtraBlack;
					font-style: normal;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-ExtraBlack.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-ExtraBlack;
					font-style: italic;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-ExtraBlackItalic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular;
					font-style: italic;
					src: url(../fonts/PetcoCircularTT-Italic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular;
					font-style: light
					src: url(/fonts/PetcoCircularTT-Light.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular;
					font-style: italic;
					font-weight: 300;
					src: url(/fonts/PetcoCircularTT-LightItalic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular;
					font-style: normal;
					font-weight: 500;
					src: url(/fonts/PetcoCircularTT-Medium.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular;
					font-style: italic;
					font-weight: 500;
					src: url(/fonts/PetcoCircularTT-MediumItalic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular;
					font-style: normal;
					src: url(/fonts/PetcoCircularTT-Regular.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-Thin;
					font-style: normal;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-Thin.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-Thin;
					font-style: italic;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-ThinItalic.woff2) format('woff2');
				}

				@font-face {
					font-family: PetcoCircular-Black;
					font-style: normal;
					font-weight: 400;
					src: url(/fonts/PetcoCircularTT-Black.woff2) format('woff2');
				}
			`,
		},
	},
};

export const createTheme = ({ primaryColor, secondaryColor }: WidgetTheme) => {
	return createMuiTheme(
		deepmerge(defaultTheme, {
			palette: { primary: primaryColor, secondary: secondaryColor },
		})
	);
};
