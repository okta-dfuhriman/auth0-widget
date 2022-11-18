import React from 'react';
import { WidgetStateContext } from '../providers';

const useWidgetState = (props?: Widget.StateProvider.State) => {
	const context = React.useContext(WidgetStateContext);

	if (context === undefined) {
		throw new Error(
			'useWidgetState must be used within a WidgetStateProvider!'
		);
	}
	return context;
};

export default useWidgetState;
