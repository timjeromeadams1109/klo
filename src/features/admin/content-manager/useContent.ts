"use client";

import { useState, useCallback, useEffect } from "react";

export type Visibility = "published" | "hidden" | "archived";

export interface BaseContentItem {
  id: string;
  visibility: Visibility;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown> | null;
  [key: string]: unknown;
}

interface UseContentOptions {
  type: "vault" | "feed";
  initialVisibility?: Visibility | "all";
}

/**
 * Shared content hook for both vault and feed content in the admin Content Manager.
 * Handles fetch, filter by visibility, update, delete, and visibility toggle.
 */
export function useContent<T extends BaseContentItem>({
  type,
  initialVisibility = "all",
}: UseContentOptions) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [visibility, setVisibility] = useState<Visibility | "all">(initialVisibility);
  const [search, setSearch] = useState("");

  const endpoint = `/api/admin/content-manager/${type}`;

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (visibility !== "all") params.set("visibility", visibility);
      if (search) params.set("search", search);
      params.set("limit", "200");

      const res = await fetch(`${endpoint}?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setItems((json.data ?? []) as T[]);
      setTotalCount(json.count ?? 0);
    } catch (err) {
      console.error(`Failed to fetch ${type}:`, err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, visibility, search, type]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const updateItem = useCallback(async (id: string, updates: Partial<T>) => {
    const res = await fetch(`${endpoint}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error((await res.json()).error ?? "Update failed");
    const json = await res.json();
    setItems((prev) => prev.map((item) => (item.id === id ? (json.data as T) : item)));
    return json.data as T;
  }, [endpoint]);

  const setItemVisibility = useCallback(async (id: string, newVisibility: Visibility) => {
    const updated = await updateItem(id, { visibility: newVisibility } as Partial<T>);
    // If we filtered by visibility and the item no longer matches, remove it from the list
    if (visibility !== "all" && updated.visibility !== visibility) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
    return updated;
  }, [updateItem, visibility]);

  const deleteItem = useCallback(async (id: string) => {
    const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error((await res.json()).error ?? "Delete failed");
    setItems((prev) => prev.filter((item) => item.id !== id));
    setTotalCount((prev) => prev - 1);
  }, [endpoint]);

  const createItem = useCallback(async (data: Partial<T>) => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error ?? "Create failed");
    const json = await res.json();
    await fetchItems();
    return json.data as T;
  }, [endpoint, fetchItems]);

  return {
    items,
    loading,
    totalCount,
    visibility,
    setVisibility,
    search,
    setSearch,
    updateItem,
    setItemVisibility,
    deleteItem,
    createItem,
    refetch: fetchItems,
  };
}
