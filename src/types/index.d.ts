declare global {
  interface AppContextType {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    HeroPreview?: HeroPreviewProps;
  }
  // Types
  type HeroPreviewProps =
    | "gif"
    | "image"
    | "video"
    | "video-slide"
    | "gif-slide"
    | "image-slide";
}

export {};
