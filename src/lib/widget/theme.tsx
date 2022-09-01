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
				textPrimary: {
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
					font-family: petcocirculartt-black italic;
					src: url(/fonts/PetcoCircularTT-BlackItalic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-BlackItalic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-bold;
					src: url(/fonts/PetcoCircularTT-Bold.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Bold.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-bold italic;
					src: url(/fonts/PetcoCircularTT-BoldItalic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-BoldItalic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-book;
					src: url(/fonts/PetcoCircularTT-Book.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Book.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-book italic;
					src: url(/fonts/PetcoCircularTT-BookItalic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-BookItalic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-extrablack;
					src: url(/fonts/PetcoCircularTT-ExtraBlack.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-ExtraBlack.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-extrablack italic;
					src: url(/fonts/PetcoCircularTT-ExtraBlackItalic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-ExtraBlackItalic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-italic;
					src: url(../fonts/PetcoCircularTT-Italic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Italic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-light;
					src: url(/fonts/PetcoCircularTT-Light.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Light.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-light italic;
					src: url(/fonts/PetcoCircularTT-LightItalic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-LightItalic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-medium;
					src: url(/fonts/PetcoCircularTT-Medium.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Medium.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-medium italic;
					src: url(/fonts/PetcoCircularTT-MediumItalic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-MediumItalic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-regular;
					src: url(/fonts/PetcoCircularTT-Regular.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Regular.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-thin;
					src: url(/fonts/PetcoCircularTT-Thin.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Thin.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-thin italic;
					src: url(/fonts/PetcoCircularTT-ThinItalic.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-ThinItalic.woff) format('woff');
				}

				@font-face {
					font-family: petcocirculartt-black;
					src: url(/fonts/PetcoCircularTT-Black.woff2) format('woff2'),
						url(../fonts/PetcoCircularTT-Black.woff) format('woff');
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
