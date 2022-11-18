import React from 'react';

import { useMutation, useIsMutating } from '@tanstack/react-query';

import useWidgetState from './useWidgetState';

const useVerifyMagicLink = () => {
	const { verifyMagicLink } = useWidgetState();

	const key = ['login', 'magic_link', 'verify'];
	const isLoading = useIsMutating(key) > 0;

	const mutation = useMutation(
		(params: VerifyMagicLinkProps) => verifyMagicLink(params),
		{
			mutationKey: key,
		}
	);

	return { mutation, isLoading };
};

export default useVerifyMagicLink;
