"use client";

import Image from "next/image";
import { overlay } from "overlay-kit";
import { LoginModal } from "@/components/login-modal";
import { Button } from "@/components/ui/button";

function openLoginModal() {
	return overlay.open(({ isOpen, close }) => (
		<LoginModal isOpen={isOpen} onClose={close} />
	));
}

export function TopNavigation() {
	return (
		<nav className="flex items-center justify-between px-[240px] py-[24px] h-[112px]">
			<Image src="/logo.svg" alt="Aha!ve" width={120} height={40} />
			<Button variant="solid" size="dnd-large" onClick={openLoginModal}>
				로그인
			</Button>
		</nav>
	);
}
