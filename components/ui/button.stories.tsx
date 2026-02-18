import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Check } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "UI/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: [
				// shadcn
				"default",
				"destructive",
				"outline",
				"secondary",
				"ghost",
				"link",
				// DND Solid
				"solid",
				"solid-secondary",
				"solid-assistive",
				"solid-white",
				// DND Outlined
				"outlined",
				"outlined-secondary",
				"outlined-assistive",
				// DND Text
				"text",
				"text-secondary",
				"text-assistive",
			],
		},
		size: {
			control: "select",
			options: [
				"default",
				"sm",
				"lg",
				"icon",
				"icon-sm",
				"icon-xs",
				"dnd-small",
				"dnd-medium",
				"dnd-large",
				"dnd-xl",
				"dnd-xxl",
				"dnd-xxxl",
				"dnd-icon-small",
				"dnd-icon-medium",
				"dnd-icon-large",
			],
		},
		disabled: {
			control: "boolean",
		},
		loading: {
			control: "boolean",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본
export const Default: Story = {
	args: {
		children: "Button",
		variant: "default",
	},
};

// shadcn 호환
export const ShadcnVariants: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="default">Default</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="link">Link</Button>
		</div>
	),
};

// DND Solid
export const DNDSolid: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="solid" size="dnd-large">
				Solid
			</Button>
			<Button variant="solid-secondary" size="dnd-large">
				Secondary
			</Button>
			<Button variant="solid-assistive" size="dnd-large">
				Assistive
			</Button>
			<Button variant="solid-white" size="dnd-large">
				White
			</Button>
		</div>
	),
};

// DND Outlined
export const DNDOutlined: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="outlined">Outlined</Button>
			<Button variant="outlined-secondary">Outlined Secondary</Button>
			<Button variant="outlined-assistive">Outlined Assistive</Button>
		</div>
	),
};

// DND Text
export const DNDText: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="text">Text</Button>
			<Button variant="text-secondary">Text Secondary</Button>
			<Button variant="text-assistive">Text Assistive</Button>
		</div>
	),
};

// DND Sizes
export const DNDSizes: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			<Button variant="solid" size="dnd-small">
				Small
			</Button>
			<Button variant="solid" size="dnd-medium">
				Medium
			</Button>
			<Button variant="solid" size="dnd-large">
				Large
			</Button>
			<Button variant="solid" size="dnd-xl">
				XL
			</Button>
			<Button variant="solid" size="dnd-xxl">
				XXL
			</Button>
			<Button variant="solid" size="dnd-xxxl">
				XXXL
			</Button>
		</div>
	),
};

// Disabled
export const Disabled: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="solid" size="dnd-large" disabled>
				Solid Disabled
			</Button>
			<Button variant="solid-secondary" size="dnd-large" disabled>
				Secondary Disabled
			</Button>
			<Button variant="solid-assistive" size="dnd-large" disabled>
				Assistive Disabled
			</Button>
			<Button variant="solid-white" size="dnd-large" disabled>
				White Disabled
			</Button>
		</div>
	),
};

// Loading
export const Loading: Story = {
	render: () => (
		<div className="flex flex-wrap gap-4">
			<Button variant="solid" size="dnd-large" loading>
				Loading
			</Button>
			<Button variant="solid-secondary" size="dnd-large" loading>
				Loading
			</Button>
			<Button variant="solid-assistive" size="dnd-large" loading>
				Loading
			</Button>
		</div>
	),
};

// Icon Buttons
export const IconButtons: Story = {
	render: () => (
		<div className="flex flex-wrap items-center gap-4">
			<Button variant="solid" size="dnd-icon-small" aria-label="확인">
				<Check />
			</Button>
			<Button variant="solid" size="dnd-icon-medium" aria-label="확인">
				<Check />
			</Button>
			<Button variant="solid" size="dnd-icon-large" aria-label="확인">
				<Check />
			</Button>
			<Button variant="solid-secondary" size="dnd-icon-large" aria-label="확인">
				<Check />
			</Button>
			<Button variant="solid-assistive" size="dnd-icon-large" aria-label="확인">
				<Check />
			</Button>
			<Button variant="solid-white" size="dnd-icon-large" aria-label="확인">
				<Check />
			</Button>
		</div>
	),
};

// 전체 조합
const DND_VARIANTS = [
	{ value: "solid", label: "Solid" },
	{ value: "solid-secondary", label: "Solid Secondary" },
	{ value: "solid-assistive", label: "Solid Assistive" },
	{ value: "solid-white", label: "Solid White" },
	{ value: "outlined", label: "Outlined" },
	{ value: "outlined-secondary", label: "Outlined Secondary" },
	{ value: "outlined-assistive", label: "Outlined Assistive" },
	{ value: "text", label: "Text" },
	{ value: "text-secondary", label: "Text Secondary" },
	{ value: "text-assistive", label: "Text Assistive" },
] as const;

const DND_SIZES = [
	{ value: "dnd-small", label: "Small" },
	{ value: "dnd-medium", label: "Medium" },
	{ value: "dnd-large", label: "Large" },
	{ value: "dnd-xl", label: "XL" },
	{ value: "dnd-xxl", label: "XXL" },
	{ value: "dnd-xxxl", label: "XXXL" },
] as const;

export const AllDNDVariants: Story = {
	render: () => (
		<div className="space-y-8">
			{DND_VARIANTS.map(({ value: variant, label }) => (
				<div key={variant}>
					<h3 className="typo-heading-2 font-semibold mb-4">{label}</h3>
					<div className="flex flex-wrap items-center gap-4">
						{DND_SIZES.map(({ value: size, label: sizeLabel }) => (
							<Button key={size} variant={variant} size={size}>
								{sizeLabel}
							</Button>
						))}
						<Button variant={variant} size="dnd-medium" disabled>
							Disabled
						</Button>
						<Button variant={variant} size="dnd-medium" loading>
							Loading
						</Button>
					</div>
				</div>
			))}
		</div>
	),
	parameters: {
		layout: "padded",
	},
};
