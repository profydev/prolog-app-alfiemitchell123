import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input, InputIcon, InputError } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = ({
  icon,
  iconSrc,
  label,
  hint,
  error,
  disabled,
}) => {
  return (
    <div style={{ paddingLeft: 20, paddingTop: 40, paddingBottom: 40 }}>
      <Input
        icon={icon}
        iconSrc={iconSrc}
        label={label}
        hint={hint}
        error={error}
        disabled={disabled}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Email",
  hint: "This is a hint text to help user.",
  icon: InputIcon.none,
  iconSrc: "icons/mail.svg",
  error: InputError.none,
};
Default.parameters = {
  viewMode: "docs",
};
