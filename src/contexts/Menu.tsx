import { createContext, useState } from "react";

export const MenuContext = createContext({
  title: "DevTools",
  setTitle: (value: string) => {
    console.log(value);
  },
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("DevTools");

  return (
    <MenuContext.Provider
      value={{
        title,
        setTitle,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
