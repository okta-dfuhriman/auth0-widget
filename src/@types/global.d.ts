declare global {
	type RenderResultSuccess = {
		status: 'SUCCESS';
	};

	type RenderOptions = WidgetOptions;

	type UserData = {
		userId?: string;
		email?: string;
		friendlyUserId?: string;
		tenant?: string;
		tenantFriendlyName?: string;
	};

	type WidgetOptions = {
		flow?: 'webauthn-roaming' | 'sms' | 'email' | 'otp' | undefined;
		container?: string;
		// mfaServerUrl?: string,
		// ticket?: string,
		// requestToken?: string,
		// postActionURL?: string,
		userData?: UserData;
		// globalTrackingId?: string
	};
}
export {};
