"use client";

import { VAULT_LEVELS, VAULT_TYPES, getTypeLabel } from "@/lib/vault-data";
import type { VaultLevel, VaultType } from "@/lib/vault-data";

interface FilterBarProps {
  level: string;
  type: string;
  freeOnly: boolean;
  onLevelChange: (level: string) => void;
  onTypeChange: (type: string) => void;
  onFreeOnlyChange: (freeOnly: boolean) => void;
}

function SelectDropdown({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-klo-dark border border-klo-slate rounded-lg px-3 py-2 text-sm text-klo-text appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-klo-gold/50 focus:border-klo-gold/50 transition-all duration-200 pr-8"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.5rem center",
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default function FilterBar({
  level,
  type,
  freeOnly,
  onLevelChange,
  onTypeChange,
  onFreeOnlyChange,
}: FilterBarProps) {
  const levelOptions = [
    { value: "", label: "All Levels" },
    ...VAULT_LEVELS.map((l: VaultLevel) => ({ value: l, label: l })),
  ];

  const typeOptions = [
    { value: "", label: "All Types" },
    ...VAULT_TYPES.map((t: VaultType) => ({
      value: t,
      label: getTypeLabel(t),
    })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SelectDropdown
        value={level}
        onChange={onLevelChange}
        options={levelOptions}
        label="Filter by level"
      />

      <SelectDropdown
        value={type}
        onChange={onTypeChange}
        options={typeOptions}
        label="Filter by type"
      />

      <button
        onClick={() => onFreeOnlyChange(!freeOnly)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
          freeOnly
            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
            : "bg-klo-dark text-klo-muted border-klo-slate hover:text-klo-text hover:bg-white/5"
        }`}
      >
        <div
          className={`w-8 h-4.5 rounded-full relative transition-all duration-200 ${
            freeOnly ? "bg-emerald-500" : "bg-klo-slate"
          }`}
        >
          <div
            className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all duration-200 ${
              freeOnly ? "left-4" : "left-0.5"
            }`}
          />
        </div>
        Free Only
      </button>
    </div>
  );
}
