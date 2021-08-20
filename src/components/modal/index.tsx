import React, { useRef } from "react";
import Portal from "../portal";
import useOnClickOutside from "hooks/useOnClickOutside";

import styles from "./styles.module.scss";

interface IModal {
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ isOpen, toggleModal, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dimmerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(modalRef, toggleModal);
  return (
    <Portal selector="#modal">
      {isOpen && (
        <>
          <div className={styles.dimmer} ref={dimmerRef}>
            <div className={styles.modal} ref={modalRef}>
              {children}
            </div>
          </div>
        </>
      )}
    </Portal>
  );
};

export default Modal;
