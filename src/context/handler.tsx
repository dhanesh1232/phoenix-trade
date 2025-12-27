"use client";

import * as React from "react";

const AppContext = React.createContext<AppContextType | undefined>(undefined);

const defaultForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  product: "",
  quantity: "",
  country: "",
  packaging: "",
  timeline: "",
  message: "",
};
export function AppProvider({ children }: { children: React.ReactNode }) {
  /* UI STATE */
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [heroPreview, setHeroPreview] =
    React.useState<HeroPreviewProps>("video");

  /* DATA */
  const [categories, setCategories] = React.useState();
  const [formData, setFormData] = React.useState<ContactForm>(defaultForm);
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

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
        defaultForm,
        form: formData,
        setForm: setFormData,
        loading,
        setLoading,
        submitted,
        setSubmitted,
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
