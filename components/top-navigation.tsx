import Image from "next/image";

import { Button } from "@/components/ui/button";

export function TopNavigation() {
	return (
		<nav className="flex items-center justify-between px-[240px] py-[24px] h-[112px]">
			<Image src="/logo.svg" alt="Aha!ve" width={120} height={40} />
			<Button variant="solid" size="dnd-small">
				로그인
			</Button>
		</nav>
	);
}
