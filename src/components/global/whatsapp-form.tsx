"use client";

import { FaWhatsapp } from "react-icons/fa";
import { useApp } from "@/context/handler";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { product_whatsapp_message } from "@/lib/message";
import { useState, useEffect, useCallback, useRef } from "react";
import { Send, MapPin, Package } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export function WhatsappDialogForm() {
  const path = usePathname();
  const { whatsappForm, setWhatsappForm, defaultWhatsappForm } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<WhatsappFormData>({
    name: "",
    category: "",
    country: "",
    quantity: "",
    message: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ✅ AUTO-OPEN when whatsappForm.name AND whatsappForm.category are filled
  useEffect(() => {
    if (whatsappForm?.name && whatsappForm?.category) {
      setIsOpen(true);
      setFormData({
        name: whatsappForm.name || "",
        category: whatsappForm.category || "",
        country: "",
        quantity: "",
        message: "",
        email: "",
        phone: "",
      });
    }
  }, [whatsappForm?.name, whatsappForm?.category]);

  // Close and reset
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      setWhatsappForm?.(defaultWhatsappForm!);
      setFormData({
        name: "",
        category: "",
        country: "",
        quantity: "",
        message: "",
        email: "",
        phone: "",
      });
    }, 300);
  }, [setWhatsappForm, defaultWhatsappForm]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.category || !formData.country) {
      toast.error("Please select your destination country");
      return;
    }

    setIsLoading(true);

    try {
      const whatsappUrl = product_whatsapp_message(
        formData.name,
        formData.category,
        formData.country,
        formData.quantity,
        formData.message,
        formData.email,
        formData.phone
      );

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      toast.success("Opening WhatsApp...");

      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (error) {
      toast.error("Failed to open WhatsApp");
      console.error("WhatsApp error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof WhatsappFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (path.startsWith("/phoenix-admin-panel-9753") || path === "/not-found") {
    return null;
  }

  // Don't render if no context trigger
  if (!whatsappForm?.name || !whatsappForm?.category) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen(!isOpen);
        handleClose();
      }}
      modal
    >
      <DialogContent className="sm:max-w-md p-0 max-h-[90vh] overflow-hidden flex flex-col gap-0">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <FaWhatsapp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                Quick WhatsApp Enquiry
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Get instant response from our export team
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {/* ✅ Pre-filled Product Info - Auto-populated */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-linear-to-r from-green-500/5 to-emerald-500/5 border border-green-200/50 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <Package className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <div className="space-y-1 min-w-0">
                <p
                  className="text-sm font-semibold text-foreground truncate"
                  title={formData.name}
                >
                  {formData.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Category:{" "}
                  <span className="font-medium">{formData.category}</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="space-y-3">
            {/* REQUIRED: Destination Country */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Destination Country *
              </Label>
              <Select
                value={formData.country}
                onValueChange={(v) => handleInputChange("country", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select destination country" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="USA">🇺🇸 USA</SelectItem>
                  <SelectItem value="UK">🇬🇧 UK</SelectItem>
                  <SelectItem value="UAE">🇦🇪 UAE</SelectItem>
                  <SelectItem value="Australia">🇦🇺 Australia</SelectItem>
                  <SelectItem value="Canada">🇨🇦 Canada</SelectItem>
                  <SelectItem value="Germany">🇩🇪 Germany</SelectItem>
                  <SelectItem value="Netherlands">🇳🇱 Netherlands</SelectItem>
                  <SelectItem value="Saudi Arabia">🇸🇦 Saudi Arabia</SelectItem>
                  <SelectItem value="Singapore">🇸🇬 Singapore</SelectItem>
                  <SelectItem value="Other">🌍 Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Quantity
              </Label>
              <Input
                placeholder="e.g. 1000kg, 500 units, 1 container"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                className="h-10 text-sm"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Message (optional)
              </Label>
              <Textarea
                ref={textareaRef}
                placeholder="Packaging requirements? Delivery timeline? Certifications needed?..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="min-h-20 resize-none text-sm"
                rows={3}
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <Label className="text-xs">Email</Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Phone</Label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="h-10 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 pt-2 border-t border-border/50 bg-muted/20">
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-green-500 hover:bg-green-600 flex items-center gap-2 font-semibold disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading || !formData.country}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Opening...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send to WhatsApp
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
