import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { RegistrationForm } from "../registrationForm";

const meta: Meta<typeof RegistrationForm> = {
  title: "RegistrationForm",
  component: RegistrationForm,
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
      <RegistrationForm />
    </div>
  ),
};
