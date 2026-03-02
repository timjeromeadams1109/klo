"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface AnimatedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  effect?: "kenburns" | "zoom-hover" | "fade-in" | "parallax";
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className = "",
  containerClassName = "",
  priority = false,
  effect = "fade-in",
}: AnimatedImageProps) {
  const kenburnsStyle = effect === "kenburns" ? {
    animation: "kenburns 20s ease-in-out infinite alternate",
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: effect === "fade-in" ? 0.95 : 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const }}
      whileHover={effect === "zoom-hover" ? { scale: 1.05 } : undefined}
      className={`overflow-hidden ${containerClassName}`}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        className={`transition-transform duration-700 ease-out ${
          effect === "zoom-hover" ? "group-hover:scale-105" : ""
        } ${className}`}
        style={kenburnsStyle}
      />
    </motion.div>
  );
}
