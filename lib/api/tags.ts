export interface Tag {
	label: string;
	count: number;
}

export async function getTags(): Promise<Tag[]> {
	try {
		const response = await fetch("/api/mock/tags");
		if (!response.ok) {
			throw new Error(`Failed to fetch tags: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Failed to fetch tags:", error);
		return [];
	}
}
