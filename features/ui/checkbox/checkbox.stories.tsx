import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox, CheckboxSize, CheckboxLabel } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = ({
  size,
  label,
  children,
  indeterminate,
  disabled,
  onChange,
}) => {
  return (
    <div style={{ padding: 10 }}>
      <Checkbox
        size={size}
        label={label}
        indeterminate={indeterminate}
        disabled={disabled}
        onChange={onChange}
      >
        {children}
      </Checkbox>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: CheckboxSize.sm,
  label: CheckboxLabel.none,
  children: "Label",
};
Default.parameters = {
  viewMode: "docs",
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  size: CheckboxSize.sm,
  label: CheckboxLabel.none,
  children: "Label",
  onChange: () => {},
  indeterminate: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  size: CheckboxSize.sm,
  label: CheckboxLabel.none,
  children: "Label",
  onChange: () => {},
  disabled: true,
};
