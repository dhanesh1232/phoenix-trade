"use client";
import { useApp } from "@/context/handler";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { StyledPhoneInput } from "../ui/phone-input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function EnquiryForm() {
  const router = useRouter();
  const {
    form,
    setForm,
    loading,
    setLoading,
    submitted,
    setSubmitted,
    defaultForm,
  } = useApp();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading?.(true);

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted?.(true);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading?.(false);
    }
  };
  return submitted ? (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="w-24 h-24 mx-auto mb-8 bg-primary/10 rounded-2xl flex items-center justify-center">
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold font-['Playfair_Display'] mb-4 text-foreground">
        Enquiry Received
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
        Thank you for your interest. Our export team will review your
        requirements and contact you within 24 hours.
      </p>
      <button
        onClick={() => router.push("/products")}
        className="px-8 py-3 bg-primary text-primary-foreground font-medium text-sm tracking-wide uppercase hover:bg-primary/90 transition-all duration-200"
      >
        Explore Products
      </button>
    </div>
  ) : (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-semibold font-['Playfair_Display'] text-foreground tracking-tight">
          Export Enquiry Form
        </h2>
        <div className="h-px w-20 bg-linear-to-r from-primary/50 to-transparent" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          Provide your requirements for instant pricing and logistics options.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Full Name *</Label>
            <Input
              required
              type="text"
              value={form?.name}
              onChange={(e) => setForm?.({ ...form, name: e.target.value })}
              placeholder="John Doe"
              className="rounded-none w-full"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Phone *</Label>
            <StyledPhoneInput
              required
              value={form?.phone}
              onChange={(e: string) => setForm?.({ ...form, phone: e })}
              className="rounded-none w-full"
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Email *</Label>
            <Input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm?.({ ...form, email: e.target.value })}
              className="w-full rounded-none"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Product Interested *</Label>
            <Input
              required
              type="text"
              value={form?.product}
              onChange={(e) => setForm?.({ ...form, product: e.target.value })}
              className="w-full rounded-none"
              placeholder="Fresh Agriculture Produce"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Target Country *</Label>
            <Select
              value={form.country}
              onValueChange={(v) => setForm?.({ ...form, country: v })}
            >
              <SelectTrigger className="w-full rounded-none">
                <SelectValue placeholder="Select destination country" />
              </SelectTrigger>
              <SelectContent className="w-full rounded-none">
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Quantity Required</Label>
            <Input
              type="text"
              value={form?.quantity}
              onChange={(e) => setForm?.({ ...form, quantity: e.target.value })}
              className="w-full rounded-none"
              placeholder="e.g. 10 tons"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Delivery Timeline</Label>
            <Input
              type="text"
              value={form?.timeline}
              onChange={(e) => setForm?.({ ...form, timeline: e.target.value })}
              className="w-full rounded-none"
              placeholder="e.g. 30 days"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Packaging Requirements</Label>
          <Input
            type="text"
            value={form?.packaging}
            onChange={(e) => setForm?.({ ...form!, packaging: e.target.value })}
            className="w-full rounded-none"
            placeholder="e.g. 10kg cartons"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Additional Details</Label>
          <Textarea
            rows={8}
            value={form?.message}
            onChange={(e) => setForm?.({ ...form, message: e.target.value })}
            className="rounded-none resize-none w-full min-h-20 max-h-32 overflow-y-auto"
            placeholder="Special requirements, certifications needed, etc."
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={() => setForm?.(defaultForm!)}
          >
            Reset
          </Button>
          <Button
            size="lg"
            variant="primary"
            disabled={loading}
            type="submit"
            className="bg-linear-to-r from-primary to-primary/90 text-primary-foreground font-semibold py-4 px-8 text-sm uppercase tracking-wide hover:from-primary/90 hover:to-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group "
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    pathLength="1"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                    className="opacity-75"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Send Export Enquiry"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
