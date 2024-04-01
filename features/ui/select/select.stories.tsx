import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  Select,
  SelectIcon,
  SelectLabel,
  SelectHint,
  SelectError,
} from "./select";

export default {
  title: "UI/Select",
  component: Select,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = ({
  options,
  icon,
  label,
  hint,
  error,
  disabled,
}) => {
  options = [
    { value: "1", label: "Phoenix Baker" },
    { value: "2", label: "Olivia Rhye" },
    { value: "3", label: "Lana Steiner" },
    { value: "4", label: "Demi Wilkinson" },
    { value: "5", label: "Candace Wu" },
    { value: "6", label: "Natali Craig" },
    { value: "7", label: "Drew Cano" },
  ];

  return (
    <div style={{ padding: 10 }}>
      <Select
        options={options}
        icon={icon}
        label={label}
        hint={hint}
        error={error}
        disabled={disabled}
      ></Select>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  icon: SelectIcon.none,
  label: SelectLabel.none,
  hint: SelectHint.none,
  error: SelectError.none,
};
Default.parameters = {
  viewMode: "docs",
};
