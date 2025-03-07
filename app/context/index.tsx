"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
interface ContextValue {
  activeModalId: string | null;
  setActiveModalId: (id: string | null) => void;
  activeTab: string | null;
  setActiveTab: (activeTab: string | null) => void;
}

const AppContext = createContext<ContextValue>({} as ContextValue);

function ContextProvider({ children }: PropsWithChildren) {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("Leaderboard");

  return (
    <AppContext.Provider
      value={{
        activeModalId,
        setActiveModalId,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
export default ContextProvider;
