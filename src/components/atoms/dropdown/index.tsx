import React, { useContext, useRef, useState } from "react";
import { useOnClickOutside, useToggle } from "hooks";
import arrowDown from "assets/icons/arrow-down.svg";

import classNames from "classnames";
import styles from "./styles.module.scss";

interface IDropdown {
  placeholder: string;
  onChange: (item: IDropdownItem) => void;
  children: React.ReactNode;
  className?: string;
}

interface IDropdownItem {
  label: string | number | undefined;
  value: string | number | undefined;
  className?: string;
}

interface IDropdownContext {
  isOpen: boolean;
  toggle: () => void;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  onChange: (item: IDropdownItem) => void;
}

const DropdownContext = React.createContext({} as IDropdownContext);

export const Dropdown = ({
  placeholder,
  onChange,
  className,
  children,
}: IDropdown) => {
  const [selected, setSelected] = useState<IDropdownItem | undefined>();
  const [isOpen, toggle] = useToggle(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(dropdownRef, () => isOpen && toggle());

  const placeholderCn = classNames({
    [styles.placeholder]: selected?.value == null,
  });

  const dropdownCn = classNames(className, styles.dropdown);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, setSelected, onChange }}>
      <div ref={dropdownRef} className={dropdownCn}>
        <DropdownItem
          label={selected?.label ?? placeholder}
          className={placeholderCn}
          value={selected?.value}
        />

        {isOpen && <div className={styles.options}> {children}</div>}
        <img
          width="14"
          height="9"
          src={arrowDown}
          className={styles.icon}
          alt="logo"
        />
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownItem = ({ label, value, className = "" }: IDropdownItem) => {
  const { setSelected, toggle, onChange } = useContext(DropdownContext);
  const handleClick = () => {
    setSelected({ value, label });
    toggle();
    onChange({ value, label });
  };

  const dropdownItemCn = classNames(styles.dropdownItem, {
    [className]: !!className,
  });

  return (
    <button onClick={handleClick} className={dropdownItemCn} value={value}>
      {label}
    </button>
  );
};

Dropdown.Item = DropdownItem;
