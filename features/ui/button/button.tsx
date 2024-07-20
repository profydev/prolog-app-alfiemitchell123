import classNames from "classnames";
import Link from "next/link";
import styles from "./button.module.scss";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
  emptyError = "emptyError",
}

export enum ButtonIcon {
  leading = "leading",
  trailing = "trailing",
  only = "only",
  none = "none",
}

type ButtonProps = {
  children: React.ReactNode;
  icon?: ButtonIcon;
  iconSrc?: string;
  size?: ButtonSize;
  color?: ButtonColor;
  onClick?: () => void;
  className?: string;
  href?: string;
};

export function Button({
  children,
  iconSrc,
  icon = ButtonIcon.none,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  onClick,
  href,
}: ButtonProps) {
  const buttonContent = (
    <>
      {icon === ButtonIcon.leading && (
        <img className={classNames(styles.icon)} src={iconSrc} />
      )}
      {icon !== ButtonIcon.only && children}
      {icon === ButtonIcon.trailing && (
        <img className={classNames(styles.icon)} src={iconSrc} />
      )}
      {icon === ButtonIcon.only && (
        <img className={classNames(styles.icon)} src={iconSrc} />
      )}
    </>
  );

  const buttonClasses = classNames(
    styles.button,
    styles[size],
    styles[color],
    icon === ButtonIcon.only && styles.only,
  );

  return href ? (
    <Link className={buttonClasses} href={href}>
      {buttonContent}
    </Link>
  ) : (
    <button className={buttonClasses} onClick={onClick}>
      {buttonContent}
    </button>
  );
}
