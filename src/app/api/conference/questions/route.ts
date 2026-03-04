import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServiceSupabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isAdminRequest = searchParams.get("admin") === "true";

  // If admin request, verify the caller is actually admin
  let showAll = false;
  if (isAdminRequest) {
    const session = await getServerSession(authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    showAll = role === "admin";
  }

  const supabase = getServiceSupabase();
  let query = supabase
    .from("conference_questions")
    .select("*")
    .order("upvotes", { ascending: false })
    .order("created_at", { ascending: false });

  if (!showAll) {
    query = query.eq("is_hidden", false);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { text, author_name } = body;

  if (!text?.trim()) {
    return NextResponse.json({ error: "Question text required" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const { data, error } = await supabase
    .from("conference_questions")
    .insert({
      text: text.trim(),
      author_name: author_name?.trim() || "Anonymous",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
