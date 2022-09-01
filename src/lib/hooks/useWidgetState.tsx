import React from 'react';
import { WidgetStateContext } from '../providers';

import type { WidgetState } from '../providers';

const useWidgetState = (props?: WidgetState) => {
	const context = React.useContext(WidgetStateContext);

	if (context === undefined) {
		throw new Error(
			'useWidgetState must be used within a WidgetStateProvider!'
		);
	}
	return context;
};

export default useWidgetState;
