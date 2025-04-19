"use client";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  basicEmployeeData,
  PackageSelectionType,
} from "../api/corporateApi/Action";
interface ContextValue {
  activeModalId: string | null;
  setActiveModalId: (id: string | null) => void;
  activeTab: string | null;
  setActiveTab: (activeTab: string | null) => void;
  connectTab: number | null;
  setConnectTab: (activeTab: number | null) => void;
  SelectetPackage: PackageSelectionType;
  setSelectetPackage: (activeTab: PackageSelectionType) => void;
  employeeData: basicEmployeeData;
  setEmployeeData: (activeTab: basicEmployeeData) => void;
  riddleScannedStatus: boolean;
  setRiddleScannedStatus: (riddleScannedStatus: boolean) => void;
}

const AppContext = createContext<ContextValue>({} as ContextValue);

function ContextProvider({ children }: PropsWithChildren) {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("Events");
  const [connectTab, setConnectTab] = useState<number | null>(null);
  const [SelectetPackage, setSelectetPackage] = useState<PackageSelectionType>({
    packagename: "",
    price: "",
    packageSize: "",
    packageDuration: "",
  });
  const [employeeData, setEmployeeData] = useState<basicEmployeeData>({
    name: "",
    email: "",
  });
  const [riddleScannedStatus, setRiddleScannedStatus] = useState(false);
  return (
    <AppContext.Provider
      value={{
        activeModalId,
        setActiveModalId,
        activeTab,
        setActiveTab,
        connectTab,
        setConnectTab,
        SelectetPackage,
        setSelectetPackage,
        employeeData,
        setEmployeeData,
        riddleScannedStatus,
        setRiddleScannedStatus,
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
