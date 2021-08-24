import React, { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

interface IInput {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
}

export const Input: FC<IInput> = ({ placeholder, onChange, className }) => {
  const inputCn = classNames(styles.input, className);
  return (
    <input placeholder={placeholder} onChange={onChange} className={inputCn} />
  );
};
