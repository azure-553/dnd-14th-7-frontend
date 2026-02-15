export interface User {
	id: string;
	name: string;
	email: string;
	picture?: string;
	provider: string;
}

export async function getUser(): Promise<User | null> {
	try {
		const response = await fetch("/api/mock/user");
		if (!response.ok) {
			throw new Error(`Failed to fetch user: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Failed to fetch user:", error);
		return null;
	}
}
