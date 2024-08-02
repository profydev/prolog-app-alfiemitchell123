import React from "react";
import classNames from "classnames";
import styles from "./modal.module.scss";

export type ModalProps = {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

export function Modal({ show, children }: ModalProps) {
  const showHideClassName = show ? styles.displayBlock : styles.displayNone;

  return (
    <div className={classNames(styles.modal, showHideClassName)}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}
