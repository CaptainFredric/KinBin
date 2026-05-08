create table if not exists care_recipients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  full_name text not null,
  date_of_birth date,
  address text,
  preferred_hospital text,
  primary_doctor text,
  allergies text,
  mobility_notes text,
  communication_notes text,
  emergency_summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists care_team_members (
  id uuid primary key default gen_random_uuid(),
  care_recipient_id uuid references care_recipients(id) on delete cascade,
  user_id uuid,
  role text not null,
  invited_email text,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists care_notes (
  id uuid primary key default gen_random_uuid(),
  care_recipient_id uuid references care_recipients(id) on delete cascade,
  author_id uuid,
  note_date date not null,
  mood text,
  meals text,
  sleep text,
  mobility text,
  pain_or_discomfort text,
  medication_issue text,
  safety_concern text,
  general_note text,
  created_at timestamptz not null default now()
);

create table if not exists medications (
  id uuid primary key default gen_random_uuid(),
  care_recipient_id uuid references care_recipients(id) on delete cascade,
  name text not null,
  dose_text text not null,
  schedule_text text not null,
  prescriber text,
  purpose text,
  notes text,
  active boolean not null default true,
  last_verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  care_recipient_id uuid references care_recipients(id) on delete cascade,
  title text not null,
  provider_name text,
  location text,
  starts_at timestamptz,
  transportation_plan text,
  questions_to_ask text,
  after_visit_notes text,
  follow_up_needed text,
  created_at timestamptz not null default now()
);

create table if not exists care_tasks (
  id uuid primary key default gen_random_uuid(),
  care_recipient_id uuid references care_recipients(id) on delete cascade,
  title text not null,
  description text,
  task_type text,
  status text not null default 'todo',
  assigned_to text,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  care_recipient_id uuid references care_recipients(id) on delete cascade,
  uploaded_by uuid,
  file_name text not null,
  file_type text,
  category text,
  storage_path text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists handoff_packets (
  id uuid primary key default gen_random_uuid(),
  care_recipient_id uuid references care_recipients(id) on delete cascade,
  generated_by uuid,
  packet_type text not null,
  date_range_start date,
  date_range_end date,
  created_at timestamptz not null default now()
);
