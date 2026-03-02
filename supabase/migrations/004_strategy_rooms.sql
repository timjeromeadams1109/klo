-- ============================================================
-- 004_strategy_rooms.sql — Strategy Rooms table
-- ============================================================

create table strategy_rooms (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_by uuid references profiles(id) on delete cascade not null,
  participants uuid[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Index for active rooms
create index idx_strategy_rooms_active on strategy_rooms(is_active) where is_active = true;

-- Enable Row Level Security
alter table strategy_rooms enable row level security;

-- Room creator can do everything
create policy "Creator can manage own rooms"
  on strategy_rooms for all
  using (auth.uid() = created_by);

-- Participants can view rooms they belong to
create policy "Participants can view their rooms"
  on strategy_rooms for select
  using (auth.uid() = any(participants));

-- Strategy room messages
create table strategy_room_messages (
  id uuid default gen_random_uuid() primary key,
  room_id uuid references strategy_rooms(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  is_ai_response boolean not null default false,
  created_at timestamptz default now()
);

create index idx_room_messages_room_id on strategy_room_messages(room_id);

alter table strategy_room_messages enable row level security;

-- Users can view messages in rooms they participate in
create policy "Participants can view room messages"
  on strategy_room_messages for select
  using (
    exists (
      select 1 from strategy_rooms
      where strategy_rooms.id = strategy_room_messages.room_id
        and (
          strategy_rooms.created_by = auth.uid()
          or auth.uid() = any(strategy_rooms.participants)
        )
    )
  );

-- Users can post messages to rooms they participate in
create policy "Participants can post room messages"
  on strategy_room_messages for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from strategy_rooms
      where strategy_rooms.id = strategy_room_messages.room_id
        and (
          strategy_rooms.created_by = auth.uid()
          or auth.uid() = any(strategy_rooms.participants)
        )
    )
  );
