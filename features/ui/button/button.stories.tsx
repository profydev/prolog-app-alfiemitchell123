import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonSize, ButtonColor, ButtonIcon } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({
  size,
  color,
  icon,
  iconSrc,
  children,
}) => (
  <div>
    <Button color={color} size={size} icon={icon} iconSrc={iconSrc}>
      {children}
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  icon: ButtonIcon.none,
  children: "Label",
};
Default.parameters = {
  viewMode: "docs",
};
