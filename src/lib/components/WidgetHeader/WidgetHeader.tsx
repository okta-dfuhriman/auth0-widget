import React from 'react';
import { useWidgetState } from '../../hooks';

export interface WidgetHeaderProps {
	children?: React.ReactNode;
}

const WidgetHeader = ({ children }: WidgetHeaderProps) => {
	const { theme } = useWidgetState();
	const { logo, hideLogo } = theme || {};

	const _logo =
		logo && typeof logo !== 'string' ? (
			logo
		) : (
			<img src={logo} alt='logo' style={{ width: '50%' }} />
		);

	return (
		<>
			{!hideLogo && _logo}
			{children}
		</>
	);
};

export default WidgetHeader;
