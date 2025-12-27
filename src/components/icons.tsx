import {
  ChevronDown,
  CornerDownLeft,
  Info,
  Layers2,
  LayoutDashboard,
  MessageCircle,
  Notebook,
  Package,
  Trash2,
  User,
  X,
} from "lucide-react";
import { FaShippingFast } from "react-icons/fa";

export const Icons = {
  dashboard: LayoutDashboard,
  product: FaShippingFast,
  package: Package,
  collection: Layers2,
  user: User,
  template: Notebook,
  cornerDownLeft: CornerDownLeft,
  x: X,
  trash2: Trash2,
  info: Info,
  chevronDown: ChevronDown,
  message: MessageCircle,
} as const;
