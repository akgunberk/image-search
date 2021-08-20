import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IPortal {
  selector: string;
  children: React.ReactNode;
}

const Portal: React.FC<IPortal> = ({ selector, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current!) : null;
};

export default Portal;
