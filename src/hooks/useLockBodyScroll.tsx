import { useLayoutEffect } from "react";

export const useLockBodyScroll = (isOpen: boolean) => {
  useLayoutEffect(() => {
    let originalStyle: string;
    if (isOpen) {
      originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
};
