"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface WalletContextType {
  mainWalletAddress: string;
  backupWalletAddress: string;
  setMainWalletAddress: (address: string) => void;
  setBackupWalletAddress: (address: string) => void;
  isWalletConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [mainWalletAddress, setMainWalletAddress] = useState<string>("");
  const [backupWalletAddress, setBackupWalletAddress] = useState<string>("");

  // Load wallet addresses from localStorage on mount
  useEffect(() => {
    const savedMainWallet = localStorage.getItem("mainWalletAddress");
    const savedBackupWallet = localStorage.getItem("backupWalletAddress");

    if (savedMainWallet) {
      setMainWalletAddress(savedMainWallet);
    }
    if (savedBackupWallet) {
      setBackupWalletAddress(savedBackupWallet);
    }
  }, []);

  // Update localStorage when addresses change
  useEffect(() => {
    if (mainWalletAddress) {
      localStorage.setItem("mainWalletAddress", mainWalletAddress);
    }
  }, [mainWalletAddress]);

  useEffect(() => {
    if (backupWalletAddress) {
      localStorage.setItem("backupWalletAddress", backupWalletAddress);
    }
  }, [backupWalletAddress]);

  const isWalletConnected = !!mainWalletAddress;

  const value = {
    mainWalletAddress,
    backupWalletAddress,
    setMainWalletAddress,
    setBackupWalletAddress,
    isWalletConnected,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};



