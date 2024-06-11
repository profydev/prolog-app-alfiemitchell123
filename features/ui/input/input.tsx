import React from "react";
import classNames from "classnames";
import styles from "./input.module.scss";

export enum InputIcon {
  icon = "icon",
  none = "none",
}

export enum InputError {
  error = "error",
  none = "none",
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  icon?: InputIcon;
  iconSrc?: string;
  error?: InputError;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?:
    | ((value: string) => void)
    | React.ChangeEventHandler<HTMLInputElement>;
};

export function Input({
  label,
  hint,
  icon = InputIcon.none,
  iconSrc,
  error = InputError.none,
  disabled = false,
  placeholder,
  onChange,
}: InputProps) {
  const labelClass = label ? styles.inputWithLabel : styles.inputWithoutLabel;
  const hintClass = hint ? styles.inputWithHint : styles.inputWithoutHint;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor="input" className={classNames(styles.label, labelClass)}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        {icon === InputIcon.icon && (
          <div className={styles.iconContainer}>
            <img className={classNames(styles.icon)} src={iconSrc} />
          </div>
        )}

        <input
          id="input"
          className={classNames(styles.input, {
            [styles.disabled]: disabled && !(error === InputError.error),
            [styles.error]: error === InputError.error,
            [styles.withIcon]: icon === InputIcon.icon,
          })}
          placeholder={placeholder}
          type="text"
          onChange={onChange}
        />

        {error === InputError.error && (
          <img className={styles.errorIcon} src="icons/alert-circle.svg" />
        )}
      </div>

      {hint && (
        <p
          className={classNames(styles.hint, hintClass)}
          style={{ color: error === InputError.error ? "#F04438" : "" }}
        >
          {error === InputError.error ? "This is an error message." : hint}
        </p>
      )}
    </div>
  );
}
