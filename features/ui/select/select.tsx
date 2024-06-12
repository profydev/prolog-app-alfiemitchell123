import React from "react";
import classNames from "classnames";
import styles from "./select.module.scss";

export enum SelectIcon {
  icon = "icon",
  none = "none",
}

export enum SelectLabel {
  label = "label",
  none = "none",
}

export enum SelectHint {
  hint = "hint",
  none = "none",
}

export enum SelectError {
  error = "error",
  none = "none",
}

export interface Option {
  value: string | null;
  label: string;
}

export type SelectProps = {
  options: Option[];
  label?: SelectLabel;
  icon?: SelectIcon;
  hint?: SelectHint;
  error?: SelectError;
  className?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | string[];
  placeholder?: string;
};

export function Select({
  options,
  label = SelectLabel.none,
  icon = SelectIcon.none,
  hint = SelectHint.none,
  error = SelectError.none,
  disabled = false,
  value,
  placeholder,
  onChange,
}: SelectProps) {
  return (
    <div className={styles.container}>
      {label === SelectLabel.label && (
        <label className={styles.label}>Team member</label>
      )}
      {icon === SelectIcon.icon && (
        <div className={styles.iconContainer}>
          <img
            className={classNames(
              styles.icon,
              label === SelectLabel.label
                ? styles.iconWithLabel
                : styles.iconWithoutLabel,
              hint === SelectHint.hint
                ? styles.iconWithHint
                : styles.iconWithoutHint,
            )}
            src="icons/select-user.svg"
          ></img>
        </div>
      )}
      <select
        id="select"
        value={value}
        disabled={disabled}
        className={classNames(styles.select, {
          [styles.disabled]: disabled && !(error === SelectError.error),
          [styles.error]: error === SelectError.error,
          [styles.withIcon]: icon === SelectIcon.icon,
          [styles.withLabel]: label === SelectLabel.label,
        })}
        onChange={onChange}
      >
        {placeholder && (
          <option value="" disabled hidden className={styles.placeholder}>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option
            className={styles.option}
            key={index}
            value={option.value || ""}
          >
            {option.label}
          </option>
        ))}
      </select>
      {hint === SelectHint.hint && (
        <p
          className={styles.hint}
          style={{ color: error === SelectError.error ? "#F04438" : "" }}
        >
          {error === SelectError.error
            ? "This is an error message."
            : "This is a hint text to help user."}
        </p>
      )}
    </div>
  );
}
