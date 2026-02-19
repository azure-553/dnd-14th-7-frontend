export function isDevelopment() {
	return process.env.NODE_ENV === "development";
}

export function isProduction() {
	return process.env.NODE_ENV === "production";
}

export function isMockAuthBypass() {
	return process.env.NEXT_PUBLIC_MOCK_AUTH_BYPASS === "true";
}
