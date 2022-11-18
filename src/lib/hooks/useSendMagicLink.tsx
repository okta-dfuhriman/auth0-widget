import { useMutation, useIsMutating } from '@tanstack/react-query';
import useWidgetState from './useWidgetState';

import type { SendMagicLinkProps } from '../providers/WidgetStateProvider';

const useSendMagicLink = () => {
	const { sendMagicLink } = useWidgetState();

	const key = ['login', 'magic_link', 'email'];
	const isLoading = useIsMutating(key) > 0;

	const mutation = useMutation(
		(params: SendMagicLinkProps) => sendMagicLink(params),
		{
			mutationKey: key,
		}
	);

	return { mutation, isLoading };
};

export default useSendMagicLink;
