import { createContext, useContext, useState } from "react";

const MenuContext = createContext({
  title: "DevTools",
  setTitle: (value: string) => {console.log(value)},
});


export const useMenuContext = () => {
  return useContext(MenuContext)
}

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState('DevTools');

  return (
    <MenuContext.Provider value={{
      title,
      setTitle,
    }}>
      {children}
    </MenuContext.Provider>
  );
};

