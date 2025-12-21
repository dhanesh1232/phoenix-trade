import {
  BookTemplate,
  Layers2,
  LayoutDashboard,
  Notebook,
  Package,
  User,
} from "lucide-react";
import { FaShippingFast } from "react-icons/fa";

export const Icons = {
  dashboard: LayoutDashboard,
  product: FaShippingFast,
  package: Package,
  collection: Layers2,
  user: User,
  template: Notebook,
} as const;
