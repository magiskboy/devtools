import { MenuContext } from "@/contexts";
import { useState } from "react";

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