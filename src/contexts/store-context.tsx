import { createContext, useContext, ReactNode } from "react";
import { RootStore } from "stores/root-store";

// Context Instance
const StoreContext = createContext(new RootStore());

// Provider
type Props = {
  children: ReactNode;
};

export const StoreProvider = ({ children }: Props) => {
  const rootStore = new RootStore();

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

// Consumer (useContext)
export const useStoreContext = () => useContext(StoreContext);
