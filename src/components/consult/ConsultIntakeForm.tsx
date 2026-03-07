"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const areasOfInterest = [
  "IT Consulting & Infrastructure",
  "CTO / Fractional CTO Services",
  "Project Management",
  "Church & Ministry Technology",
  "Digital Transformation",
  "AI & Leadership Strategy",
];

const industries = [
  "Technology/SaaS",
  "Healthcare",
  "Finance/Banking",
  "Education",
  "Government",
  "Faith-Based/Ministry",
  "Nonprofit",
  "Manufacturing",
  "Retail/E-Commerce",
  "Professional Services",
  "Other",
];

const orgSizes = ["1-10", "11-50", "51-200", "201-500", "500+"];


/* ------------------------------------------------------------------ */
/*  Animations                                                          */
/* ------------------------------------------------------------------ */

const successVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

interface FormErrors {
  [key: string]: string;
}

export default function ConsultIntakeForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    industry: "",
    location: "",
    areaOfInterest: "",
    organizationName: "",
    organizationSize: "",
    currentChallenge: "",
    additionalDetails: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  /* ---- Validation ---- */
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      newErrors.firstName = "Please enter your first name.";
    }

    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      newErrors.lastName = "Please enter your last name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    }

    if (!formData.industry) {
      newErrors.industry = "Please select your industry.";
    }

    if (!formData.areaOfInterest) {
      newErrors.areaOfInterest = "Please select an area of interest.";
    }

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Please enter your organization name.";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  /* ---- Handlers ---- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setServerMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          type: "consultation",
          name: `${formData.firstName} ${formData.lastName}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setServerMessage(data.message);
      } else {
        setStatus("error");
        setServerMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "Unable to connect to the server. Please check your connection and try again."
      );
    }
  };

  /* ---- Success state ---- */
  if (status === "success") {
    return (
      <Card className="text-center py-16">
        <motion.div
          variants={successVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="w-20 h-20 rounded-full bg-[#C8A84E]/15 flex items-center justify-center mx-auto mb-6">
            <motion.svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="text-[#C8A84E]"
            >
              <motion.path
                d="M10 20L17 27L30 13"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.svg>
          </div>
          <h3 className="font-display text-2xl font-bold text-klo-text mb-3">
            Consultation Request Received
          </h3>
          <p className="text-klo-muted max-w-md mx-auto">
            {serverMessage ||
              "Thank you for your interest in consulting with Keith. Our team will review your request and respond within 2 business days."}
          </p>
        </motion.div>
      </Card>
    );
  }

  /* ---- Form styles ---- */
  const inputBase =
    "w-full bg-[#161B22] border border-[#21262D] rounded-lg px-4 py-3 text-white text-sm placeholder:text-klo-muted/50 focus:border-[#C8A84E] focus:ring-1 focus:ring-[#C8A84E]/30 focus:outline-none transition-colors duration-200";

  const inputError =
    "border-red-500/60 focus:border-red-500/80 focus:ring-red-500/30";

  function fieldClass(field: string) {
    return `${inputBase} ${errors[field] ? inputError : ""}`;
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Server error banner */}
        <AnimatePresence>
          {status === "error" && serverMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0, transition: { ease: "easeOut" as const } }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4"
            >
              <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
              <p className="text-red-300 text-sm">{serverMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 1 — First Name & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-white mb-1.5">
              First Name <span className="text-[#C8A84E]">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className={fieldClass("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-white mb-1.5">
              Last Name <span className="text-[#C8A84E]">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className={fieldClass("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Row 2 — Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1.5">
              Email <span className="text-[#C8A84E]">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@organization.com"
              value={formData.email}
              onChange={handleChange}
              className={fieldClass("email")}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-white mb-1.5">
              Phone Number <span className="text-[#C8A84E]">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              className={fieldClass("phone")}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Row 3 — Industry & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-white mb-1.5">
              Industry <span className="text-[#C8A84E]">*</span>
            </label>
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={fieldClass("industry")}
            >
              <option value="" disabled>
                Select your industry
              </option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="text-red-400 text-xs mt-1">{errors.industry}</p>
            )}
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-white mb-1.5">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="City, State or Region"
              value={formData.location}
              onChange={handleChange}
              className={fieldClass("location")}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#21262D] my-2" />

        {/* Row 4 — Area of Interest */}
        <div>
          <label htmlFor="areaOfInterest" className="block text-sm font-medium text-white mb-1.5">
            Area of Interest <span className="text-[#C8A84E]">*</span>
          </label>
          <select
            id="areaOfInterest"
            name="areaOfInterest"
            value={formData.areaOfInterest}
            onChange={handleChange}
            className={fieldClass("areaOfInterest")}
          >
            <option value="" disabled>
              Select an area of interest
            </option>
            {areasOfInterest.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.areaOfInterest && (
            <p className="text-red-400 text-xs mt-1">{errors.areaOfInterest}</p>
          )}
        </div>

        {/* Row 5 — Organization Name & Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-white mb-1.5">
              Organization Name <span className="text-[#C8A84E]">*</span>
            </label>
            <input
              id="organizationName"
              name="organizationName"
              type="text"
              placeholder="Your organization"
              value={formData.organizationName}
              onChange={handleChange}
              className={fieldClass("organizationName")}
            />
            {errors.organizationName && (
              <p className="text-red-400 text-xs mt-1">{errors.organizationName}</p>
            )}
          </div>
          <div>
            <label htmlFor="organizationSize" className="block text-sm font-medium text-white mb-1.5">
              Organization Size
            </label>
            <select
              id="organizationSize"
              name="organizationSize"
              value={formData.organizationSize}
              onChange={handleChange}
              className={fieldClass("organizationSize")}
            >
              <option value="" disabled>
                Select size
              </option>
              {orgSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            {errors.organizationSize && (
              <p className="text-red-400 text-xs mt-1">{errors.organizationSize}</p>
            )}
          </div>
        </div>

        {/* Current Challenge */}
        <div>
          <label htmlFor="currentChallenge" className="block text-sm font-medium text-white mb-1.5">
            Current Challenge
          </label>
          <textarea
            id="currentChallenge"
            name="currentChallenge"
            rows={4}
            placeholder="Briefly describe what you're looking to solve or improve..."
            value={formData.currentChallenge}
            onChange={handleChange}
            className={fieldClass("currentChallenge") + " resize-none"}
          />
          {errors.currentChallenge && (
            <p className="text-red-400 text-xs mt-1">{errors.currentChallenge}</p>
          )}
        </div>

        {/* Additional Details */}
        <div>
          <label htmlFor="additionalDetails" className="block text-sm font-medium text-white mb-1.5">
            Additional Details
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            rows={3}
            placeholder="Any other information you'd like to share..."
            value={formData.additionalDetails}
            onChange={handleChange}
            className={fieldClass("additionalDetails") + " resize-none"}
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full md:w-auto"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Request Consultation
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </form>
    </Card>
  );
}
