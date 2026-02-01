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
      <Button variant="solid">Solid</Button>
      <Button variant="solid-secondary">Solid Secondary</Button>
      <Button variant="solid-assistive">Solid Assistive</Button>
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
      <Button variant="solid" size="dnd-small">Small</Button>
      <Button variant="solid" size="dnd-medium">Medium</Button>
      <Button variant="solid" size="dnd-large">Large</Button>
    </div>
  ),
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="solid" disabled>Solid Disabled</Button>
      <Button variant="outlined" disabled>Outlined Disabled</Button>
      <Button variant="text" disabled>Text Disabled</Button>
    </div>
  ),
};

// Loading
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="solid" loading>Loading</Button>
      <Button variant="outlined" loading>Loading</Button>
      <Button variant="text" loading>Loading</Button>
    </div>
  ),
};

// Icon Buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="solid" size="icon"><Check /></Button>
      <Button variant="solid" size="icon-sm"><Check /></Button>
      <Button variant="solid" size="icon-xs"><Check /></Button>
      <Button variant="outlined" size="icon"><Check /></Button>
      <Button variant="text" size="icon"><Check /></Button>
    </div>
  ),
};

// 전체 조합
export const AllDNDVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Solid</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid" size="dnd-small">Small</Button>
          <Button variant="solid" size="dnd-medium">Medium</Button>
          <Button variant="solid" size="dnd-large">Large</Button>
          <Button variant="solid" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="solid" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Solid Secondary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid-secondary" size="dnd-small">Small</Button>
          <Button variant="solid-secondary" size="dnd-medium">Medium</Button>
          <Button variant="solid-secondary" size="dnd-large">Large</Button>
          <Button variant="solid-secondary" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="solid-secondary" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Solid Assistive</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="solid-assistive" size="dnd-small">Small</Button>
          <Button variant="solid-assistive" size="dnd-medium">Medium</Button>
          <Button variant="solid-assistive" size="dnd-large">Large</Button>
          <Button variant="solid-assistive" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="solid-assistive" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Outlined</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outlined" size="dnd-small">Small</Button>
          <Button variant="outlined" size="dnd-medium">Medium</Button>
          <Button variant="outlined" size="dnd-large">Large</Button>
          <Button variant="outlined" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="outlined" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Outlined Secondary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outlined-secondary" size="dnd-small">Small</Button>
          <Button variant="outlined-secondary" size="dnd-medium">Medium</Button>
          <Button variant="outlined-secondary" size="dnd-large">Large</Button>
          <Button variant="outlined-secondary" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="outlined-secondary" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Outlined Assistive</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="outlined-assistive" size="dnd-small">Small</Button>
          <Button variant="outlined-assistive" size="dnd-medium">Medium</Button>
          <Button variant="outlined-assistive" size="dnd-large">Large</Button>
          <Button variant="outlined-assistive" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="outlined-assistive" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Text</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="text" size="dnd-small">Small</Button>
          <Button variant="text" size="dnd-medium">Medium</Button>
          <Button variant="text" size="dnd-large">Large</Button>
          <Button variant="text" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="text" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Text Secondary</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="text-secondary" size="dnd-small">Small</Button>
          <Button variant="text-secondary" size="dnd-medium">Medium</Button>
          <Button variant="text-secondary" size="dnd-large">Large</Button>
          <Button variant="text-secondary" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="text-secondary" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
      <div>
        <h3 className="typo-heading-2 font-semibold mb-4">Text Assistive</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="text-assistive" size="dnd-small">Small</Button>
          <Button variant="text-assistive" size="dnd-medium">Medium</Button>
          <Button variant="text-assistive" size="dnd-large">Large</Button>
          <Button variant="text-assistive" size="dnd-medium" disabled>Disabled</Button>
          <Button variant="text-assistive" size="dnd-medium" loading>Loading</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
