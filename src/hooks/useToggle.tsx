import { useState } from "react";

const useToggle = (state: boolean): [boolean, () => void] => {
  const [isState, setState] = useState(state);

  const toggle = () => setState(!isState);

  return [isState, toggle];
};

export default useToggle;
