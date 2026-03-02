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
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer shrink-0 ${
              isActive
                ? "bg-[#68E9FA] text-[#022886]"
                : "bg-[#011A5E] text-[#8BA3D4] hover:text-klo-text hover:bg-[#011A5E]/80"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
