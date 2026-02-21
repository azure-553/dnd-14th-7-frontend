import { redirect } from "next/navigation";
import { saveAuthTokens } from "./actions";
import { LoginSuccessView } from "./login-success-view";

interface PageProps {
	searchParams: Promise<{ accessToken?: string; refreshToken?: string }>;
}

export default async function LoginSuccessPage({ searchParams }: PageProps) {
	const { accessToken, refreshToken } = await searchParams;

	if (accessToken && refreshToken) {
		await saveAuthTokens(accessToken, refreshToken);
		redirect("/login-success");
	}

	return <LoginSuccessView />;
}
