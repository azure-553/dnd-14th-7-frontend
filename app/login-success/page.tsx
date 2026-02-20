import { redirect } from "next/navigation";
import { LoginSuccessView } from "./login-success-view";

interface PageProps {
	searchParams: Promise<{ accessToken?: string; refreshToken?: string }>;
}

export default async function LoginSuccessPage({ searchParams }: PageProps) {
	const { accessToken, refreshToken } = await searchParams;

	if (accessToken && refreshToken) {
		redirect(
			`/api/auth/token?accessToken=${accessToken}&refreshToken=${refreshToken}`,
		);
	}

	return <LoginSuccessView />;
}
