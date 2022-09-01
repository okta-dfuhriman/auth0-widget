import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootLoginButton = styled(Button)({
	height: '50px',
	borderRadius: 0,
	minWidth: '16rem',
	padding: 0,
	border: '1px solid transparent',
	justifyContent: 'flex-start',
	textAlign: 'center',
	textTransform: 'unset',
	'&:hover': {
		backgroundColor: '#051131',
		boxShadow: 'unset',
	},
});

export default RootLoginButton;
