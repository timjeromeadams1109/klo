import { NextResponse } from "next/server";
import { getServiceSupabase } from "@/lib/supabase";
import { verifyCreativeStudioAdmin } from "@/lib/creative-studio-auth";

// GET /api/admin/creative-studio/media/folders — list distinct folders with counts
export async function GET() {
  const session = await verifyCreativeStudioAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceSupabase();

  // Get all distinct folders with counts
  const { data, error } = await supabase
    .from("media_assets")
    .select("folder");

  if (error) {
    console.error("[GET /api/admin/creative-studio/media/folders]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Count by folder
  const folderCounts: Record<string, number> = {};
  for (const row of data ?? []) {
    folderCounts[row.folder] = (folderCounts[row.folder] || 0) + 1;
  }

  const folders = Object.entries(folderCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({ data: folders });
}
