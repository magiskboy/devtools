import { useContext } from "react";
import { MenuContext } from "@/contexts/Menu";

export const useMenuContext = () => {
  return useContext(MenuContext);
};
