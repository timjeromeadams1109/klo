"use client";

import { useRef } from "react";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-1 overflow-x-auto scrollbar-hide pb-1 -mx-2 px-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer shrink-0 ${
              isActive
                ? "text-klo-gold border-b-2 border-klo-gold bg-klo-gold/5"
                : "text-klo-muted hover:text-klo-text hover:bg-white/5"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
