"use client";

import * as React from "react";

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  /* UI STATE */
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [heroPreview, setHeroPreview] =
    React.useState<HeroPreviewProps>("video");

  return (
    <AppContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        HeroPreview: heroPreview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}
