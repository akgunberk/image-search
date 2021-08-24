import React, { useRef } from "react";
import { Portal } from "components";
import { useOnClickOutside, useLockBodyScroll } from "hooks";

import styles from "./styles.module.scss";
import classNames from "classnames";

interface IModal {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<IModal> = ({
  isOpen,
  onToggle,
  className = "",
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dimmerRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpen);
  useOnClickOutside(modalRef, onToggle);

  const modalCn = classNames(styles.dimmer, { [className]: !!className });
  return (
    <Portal selector="#modal">
      {isOpen && (
        <>
          <div className={modalCn} ref={dimmerRef}></div>
          <div className={styles.modal} ref={modalRef}>
            {children}
          </div>
        </>
      )}
    </Portal>
  );
};
