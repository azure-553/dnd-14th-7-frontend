import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-[335px]">
      <Textarea
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        description="메시지에 마침표를 찍어요."
      />
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="w-[335px]">
      <Textarea
        label="주제"
        defaultValue="오늘 하루도 열심히 보냈습니다. 내일은 더 좋은 하루가 되길 바랍니다."
        description="메시지에 마침표를 찍어요."
      />
    </div>
  ),
}

export const WithCharacterCounter: Story = {
  render: () => (
    <div className="w-[335px]">
      <Textarea
        label="주제"
        defaultValue="값이 입력된 상태입니다."
        showCharacterCount
        maxLength={2000}
        description="메시지에 마침표를 찍어요."
      />
    </div>
  ),
}

export const WithTrailingButton: Story = {
  render: () => (
    <div className="w-[335px]">
      <Textarea
        label="주제"
        defaultValue="값이 입력된 상태입니다."
        showCharacterCount
        maxLength={2000}
        trailingButton="텍스트"
        onTrailingButtonClick={() => alert("버튼 클릭!")}
        description="메시지에 마침표를 찍어요."
      />
    </div>
  ),
}

export const Error: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[335px]">
      <Textarea
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        error
        errorMessage="에러 메시지를 나타내요."
      />
      <Textarea
        label="주제"
        defaultValue="값이 입력된 상태입니다."
        error
        errorMessage="에러 메시지를 나타내요."
        showCharacterCount
        maxLength={2000}
      />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[335px]">
      <Textarea
        label="주제"
        placeholder="텍스트를 입력해 주세요."
        disabled
        description="메시지에 마침표를 찍어요."
      />
      <Textarea
        label="주제"
        defaultValue="값이 입력된 상태입니다."
        disabled
        showCharacterCount
        maxLength={2000}
        trailingButton="텍스트"
        description="메시지에 마침표를 찍어요."
      />
    </div>
  ),
}

export const ResizeOptions: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[250px]">
        <p className="text-sm text-dnd-label-alternative mb-2">resize = vertical (default)</p>
        <Textarea
          label="주제"
          defaultValue="세로로만 리사이즈 가능"
          resize="vertical"
        />
      </div>
      <div className="w-[250px]">
        <p className="text-sm text-dnd-label-alternative mb-2">resize = normal</p>
        <Textarea
          label="주제"
          defaultValue="자유롭게 리사이즈 가능"
          resize="normal"
        />
      </div>
      <div className="w-[250px]">
        <p className="text-sm text-dnd-label-alternative mb-2">resize = none</p>
        <Textarea
          label="주제"
          defaultValue="리사이즈 불가"
          resize="none"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Normal Column */}
      <div className="flex flex-col gap-4 w-[335px]">
        <p className="font-semibold">Normal</p>
        <Textarea
          label="주제"
          placeholder="텍스트를 입력해 주세요."
          description="메시지에 마침표를 찍어요."
        />
        <Textarea
          label="주제"
          defaultValue="값이 입력된 상태입니다."
          showCharacterCount
          maxLength={2000}
          trailingButton="텍스트"
          description="메시지에 마침표를 찍어요."
        />
        <Textarea
          label="주제"
          placeholder="텍스트를 입력해 주세요."
          disabled
          description="메시지에 마침표를 찍어요."
        />
      </div>

      {/* Error Column */}
      <div className="flex flex-col gap-4 w-[335px]">
        <p className="font-semibold">Error</p>
        <Textarea
          label="주제"
          placeholder="텍스트를 입력해 주세요."
          error
          errorMessage="에러 메시지를 나타내요."
        />
        <Textarea
          label="주제"
          defaultValue="값이 입력된 상태입니다."
          error
          errorMessage="에러 메시지를 나타내요."
          showCharacterCount
          maxLength={2000}
          trailingButton="텍스트"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
}
