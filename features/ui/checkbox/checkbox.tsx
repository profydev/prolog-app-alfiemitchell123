import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

export enum CheckboxLabel {
  label = "label",
  none = "none",
}

type CheckboxProps = {
  children: React.ReactNode;
  label?: CheckboxLabel;
  size?: CheckboxSize;
  className?: string;
  indeterminate?: boolean;
  onChange: (isChecked: boolean) => void;
  disabled?: boolean;
};

export function Checkbox({
  children,
  label = CheckboxLabel.none,
  size = CheckboxSize.sm,
  indeterminate = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newCheckedState: boolean = event.target.checked;
    setIsChecked(newCheckedState);

    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id="checkbox"
        onChange={handleChange}
        disabled={disabled}
        checked={isChecked}
        {...(indeterminate && { indeterminate: true })}
        className={classNames(styles.checkbox, styles[size])}
      />

      <span className={classNames(styles.checkmarkContainer, styles[size])}>
        {isChecked && !indeterminate && (
          <svg
            className={classNames(styles.checkmark, styles[size], {
              [styles.disabled]: disabled,
            })}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="check">
              <path
                id="Icon"
                d="M10 3L4.5 8.5L2 6"
                stroke="#7F56D9"
                stroke-width="1.6666"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        )}

        {indeterminate && (
          <svg
            className={classNames(styles.checkmark, styles[size], {
              [styles.disabled]: disabled,
            })}
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.91675 1H10.0834"
              stroke="#7F56D9"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </span>

      <label
        htmlFor="checkbox"
        className={classNames(styles.label, styles[size], {
          [styles.disabled]: disabled,
        })}
      >
        {label !== CheckboxLabel.none && children}
      </label>
    </div>
  );
}
