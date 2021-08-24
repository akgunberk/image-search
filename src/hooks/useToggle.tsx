import { useState } from "react";

export const useToggle = (state: boolean): [boolean, () => void] => {
  const [isState, setState] = useState(state);

  const toggle = () => setState(!isState);

  return [isState, toggle];
};
