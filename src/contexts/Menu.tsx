import { createContext } from "react";

export const MenuContext = createContext({
  title: "DevTools",
  setTitle: (value: string) => {
    console.log(value);
  },
});
