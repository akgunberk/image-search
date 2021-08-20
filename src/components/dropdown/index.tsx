import React, { useContext, useRef, useState } from "react";
import { useOnClickOutside, useToggle } from "hooks";
import arrowDown from "../../assets/icons/arrow-down.svg";

import classNames from "classnames";
import styles from "./styles.module.scss";

interface IDropdown {
  placeholder: string;
  children: React.ReactNode;
  className?: string;
}

interface IDropdownItem {
  value: string | number | undefined;
  children: React.ReactNode;
  className?: string;
}

interface IDropdownContext {
  isOpen: boolean;
  toggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const DropdownContext = React.createContext({} as IDropdownContext);

function Dropdown({ placeholder, className, children }: IDropdown) {
  const [value, setValue] = useState<string | number | undefined>();
  const [isOpen, toggle] = useToggle(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(dropdownRef, () => isOpen && toggle());

  const placeholderCn = classNames({ [styles.placeholder]: value == null });

  const dropdownCn = classNames(className, styles.dropdown);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, setValue }}>
      <div ref={dropdownRef} className={dropdownCn}>
        <DropdownItem className={placeholderCn} value={value}>
          {value ?? placeholder}
        </DropdownItem>
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
}

const DropdownItem = ({ value, children, className = "" }: IDropdownItem) => {
  const { setValue, toggle } = useContext(DropdownContext);
  const handleClick = () => {
    setValue(value);
    toggle();
  };

  const dropdownItemCn = classNames(styles.dropdownItem, {
    [className]: !!className,
  });

  return (
    <button onClick={handleClick} className={dropdownItemCn} value={value}>
      {children}
    </button>
  );
};

Dropdown.Item = DropdownItem;

export default Dropdown;
