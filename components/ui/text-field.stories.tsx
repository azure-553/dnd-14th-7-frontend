import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextField } from "./text-field";

const meta: Meta<typeof TextField> = {
  title: "UI/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <TextField
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        helperText="메시지에 마침표를 찍어요."
      />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="w-80">
      <TextField
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        defaultValue="값"
        helperText="메시지에 마침표를 찍어요."
      />
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        error
        errorMessage="에러 메시지를 나타내요."
      />
      <TextField
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        defaultValue="값"
        error
        errorMessage="에러 메시지를 나타내요."
      />
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextField
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        defaultValue="값"
        success
        successMessage="성공 메시지를 나타내요."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <TextField
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        disabled
        helperText="메시지에 마침표를 찍어요."
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {/* Default Column */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-dnd-label-neutral">Default</p>
        <TextField
          label="주제"
          placeholder="텍스트를 입력해 주세요."
          helperText="메시지에 마침표를 찍어요."
        />
        <TextField
          label="주제"
          defaultValue="값"
          helperText="메시지에 마침표를 찍어요."
        />
        <TextField
          label="주제"
          placeholder="텍스트를 입력해 주세요."
          disabled
          helperText="메시지에 마침표를 찍어요."
        />
      </div>

      {/* Success Column */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-dnd-label-neutral">Success</p>
        <TextField
          label="주제"
          defaultValue="값"
          success
          successMessage="성공 메시지를 나타내요."
        />
      </div>

      {/* Error Column */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-semibold text-dnd-label-neutral">Error</p>
        <TextField
          label="주제"
          placeholder="텍스트를 입력해 주세요."
          error
          errorMessage="에러 메시지를 나타내요."
        />
        <TextField
          label="주제"
          defaultValue="값"
          error
          errorMessage="에러 메시지를 나타내요."
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
