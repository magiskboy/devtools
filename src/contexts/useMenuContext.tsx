import { useContext } from "react";
import { MenuContext } from "./Menu";

export const useMenuContext = () => {
  return useContext(MenuContext);
};
