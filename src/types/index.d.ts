declare global {
  interface AppContextType {
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
    HeroPreview?: HeroPreviewProps;
    categories?: Record<string, string>[];
    defaultForm?: ContactForm;
    form: ContactForm;
    setForm?: (value: ContactForm) => void;
    loading?: boolean;
    setLoading?: (value: boolean) => void;
    submitted?: boolean;
    setSubmitted?: (value: boolean) => void;
  }

  type ContactForm = {
    name: string;
    phone: string;
    email: string;
    product: string;
    quantity: string;
    country: string;
    packaging: string;
    timeline: string;
    message: string;
  };
  // Types
  type HeroPreviewProps =
    | "gif"
    | "image"
    | "video"
    | "video-slide"
    | "gif-slide"
    | "image-slide";

  type ImageFormat = {
    url: string;
    name?: string;
    fileName?: string;
    id?: string;
    thumbnail?: string;
  };

  type CategoryFormValues = {
    _id?: string;
    name: string;
    slug: string;
    image?: ImageFormat | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    description?: string;
  };

  type CategoryDialogProps = {
    open: boolean;
    setOpen: (v: boolean) => void;
    mode: "create" | "edit";
    initialValues?: CategoryFormValues;
    onSubmit: (values: CategoryFormValues) => void;
    isSubmitting: boolean;
  };

  type ProductStatus = "active" | "inactive" | "draft";

  type ProductFormValues = {
    id?: string;
    name: string;
    slug?: string;
    category: string;
    categoryName?: string;
    shortDescription?: string;
    description: any;
    specifications: {
      origin: string;
      processingType: string;
      shelfLife: string;
      certifications: string[];
      applications: string[];
    };
    productType?: ProductTypeProps;
    availability: ProductEnquiryProps;
    markets: Market[];
    tags?: string[];
    status: ProductStatus;
    images?: ProductImagesProps;
    seo: Metadata;
    createdAt?: string;
    detailPage?: boolean;
  };

  type Market = "EU" | "GCC" | "US" | "ASEAN";
  type Metadata = {
    metaTitle: string;
    metaDescription: string;
    featuredImage: string;
    canonicalUrl?: string;
    keywords?: string[];
  };

  type ProductImagesProps = {
    featured: ImageFormat;
    gallery: ImageFormat[];
  } | null;

  type ProductTypeProps = "food" | "marine" | "sustainable" | "dried";
  type ProductEnquiryProps = "in_stock" | "enquiry";
  type CategoryOption = { id: string; name: string };

  type ProductStatus = "active" | "inactive" | "draft";
  type ProductDialogProps = {
    open: boolean;
    setOpen: (v: boolean) => void;
    mode: "create" | "edit";
    initialValues?: ProductFormValues;
    categories: CategoryOption[];
    onSubmit: (values: ProductFormValues) => void;
    isSubmitting?: boolean;
  };

  interface MultiWordsProps {
    defaultWords?: string[];
    onChange?: (keywords: string[]) => void;
    placeholder?: string;
    label?: string;
    clearAll?: () => void;
  }

  interface MainToolbarProps {
    onHighlighterClick: () => void;
    onLinkClick: () => void;
    isMobile: boolean;
  }

  type MobileToolbarContentType = "highlighter" | "link";

  interface MobileToolbarContentProps {
    type: MobileToolbarContentType;
    onBack: () => void;
  }

  interface RichTextEditorProps {
    content?: string;
    onChange?: (value: string | any) => void;
  }
}

export {};
