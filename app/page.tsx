import { InsightInput } from "@/components/insight-input";
import { TopNavigation } from "@/components/top-navigation";

export default function Page() {
	return (
		<div className="min-h-screen bg-[linear-gradient(180deg,rgba(242,250,249,0.15)_3.5%,rgb(242,250,249)_35.4%),white]">
			<TopNavigation />
			<main className="flex flex-col items-center gap-[40px] px-[240px] pt-[60px]">
				<InsightInput />
			</main>
		</div>
	);
}
