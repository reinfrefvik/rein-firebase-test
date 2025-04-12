import type { Meta, StoryObj } from "@storybook/react";

import { UserRegistrationForm } from "../userRegistrationForm";

const meta: Meta<typeof UserRegistrationForm> = {
  title: "RegistrationForm",
  component: UserRegistrationForm,
  parameters: {},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserRegistrationForm />
    </div>
  ),
};
