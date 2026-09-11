-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Projects Table
create table projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text unique not null,
  title text not null,
  category text not null,
  project_type text, -- 'Client Work', 'Personal Project', etc.
  domains text[], -- Array of strings e.g. ['AI Systems', 'Backend']
  "desc" text not null, -- Description
  tech text[], -- Array of strings e.g. ['React', 'Python']
  featured boolean default false,
  type text check (type in ('free', 'premium')),
  price text, -- e.g. 'R2,900'
  link text,
  github text,
  architecture text,
  challenges text,
  performance text,
  problem text,
  solution text,
  impact text,
  content text, -- Markdown content
  stars text -- For open source projects
);

-- Blog Posts Table
create table posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  slug text unique not null,
  title text not null,
  excerpt text not null,
  date date not null,
  read_time text,
  category text,
  content text -- Markdown content
);

-- Set up Row Level Security (RLS)
-- Enable RLS
alter table projects enable row level security;
alter table posts enable row level security;

-- Create Policy: Allow public read access
create policy "Public projects are viewable by everyone"
  on projects for select
  using ( true );

create policy "Public posts are viewable by everyone"
  on posts for select
  using ( true );

-- Create Policy: Allow authenticated users (you) to insert/update/delete
-- Assuming you use Supabase Auth and are the only user
create policy "Enable all access for authenticated users"
  on projects for all
  using ( auth.role() = 'authenticated' );

create policy "Enable all access for authenticated users"
  on posts for all
  using ( auth.role() = 'authenticated' );
