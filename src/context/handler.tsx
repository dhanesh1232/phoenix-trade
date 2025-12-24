"use client";

import * as React from "react";

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  /* UI STATE */
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [heroPreview, setHeroPreview] =
    React.useState<HeroPreviewProps>("video");

  const [categories, setCategories] = React.useState();
  const fetchCategories = React.useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.data.categories);
    } catch (err: unknown) {
      const e = err as Error;
      console.log(e.message);
    }
  }, []);
  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <AppContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        HeroPreview: heroPreview,
        categories,
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
