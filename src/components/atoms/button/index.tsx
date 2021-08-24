import React, { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface IButton {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string | (() => string);
  children: React.ReactNode;
}

export const Button: FC<IButton> = ({ onClick, className, children }) => {
  const buttonCn = classNames(styles.button, className);
  return (
    <button onClick={onClick} className={buttonCn}>
      {children}
    </button>
  );
};
