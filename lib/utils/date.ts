export function formatDate(dateString: string) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const weekday = date.toLocaleDateString("ko-KR", { weekday: "short" });
	const hours = date.getHours();
	const ampm = hours >= 12 ? "오후" : "오전";
	const formattedHours = String(hours % 12 || 12).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return {
		year,
		month,
		day,
		weekday,
		hours,
		minutes,
		ampm,
		formattedHours,
		originalDate: date,
	};
}
