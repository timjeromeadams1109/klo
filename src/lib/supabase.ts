import { createClient, SupabaseClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/*  Database type definitions                                          */
/* ------------------------------------------------------------------ */

export interface Profile {
  id: string;
  full_name: string | null;
  organization_name: string | null;
  organization_type: string | null;
  industry: string | null;
  team_size: string | null;
  subscription_tier: string;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface AssessmentResult {
  id: string;
  user_id: string;
  assessment_type: string;
  score: number;
  answers: Record<string, unknown>;
  recommendations: string[];
  created_at: string;
}

export interface VaultContent {
  id: string;
  title: string;
  slug: string;
  content_type: string;
  category: string;
  body: string;
  excerpt: string | null;
  tier_required: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface StrategyRoom {
  id: string;
  name: string;
  description: string | null;
  created_by: string;
  participants: string[];
  is_active: boolean;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  tier: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile };
      assessment_results: { Row: AssessmentResult };
      vault_content: { Row: VaultContent };
      strategy_rooms: { Row: StrategyRoom };
      subscriptions: { Row: Subscription };
    };
  };
}

/* ------------------------------------------------------------------ */
/*  Browser client (public anon key)                                   */
/* ------------------------------------------------------------------ */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey
);

/* ------------------------------------------------------------------ */
/*  Server-side admin client (service role key)                        */
/* ------------------------------------------------------------------ */

export function getServiceSupabase(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. This function can only be called on the server."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
