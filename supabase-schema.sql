-- Supabase Database Schema for Coding Practice Tracking
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create coding_practices table
CREATE TABLE IF NOT EXISTS coding_practices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT NOT NULL,
    problem_slug TEXT NOT NULL,
    problem_title TEXT NOT NULL,
    language TEXT NOT NULL,
    code TEXT NOT NULL,
    status TEXT CHECK (status IN ('completed', 'attempted', 'failed')) NOT NULL,
    execution_time INTEGER, -- in milliseconds
    memory_used INTEGER, -- in KB
    test_cases_passed INTEGER NOT NULL DEFAULT 0,
    total_test_cases INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    problems_solved INTEGER DEFAULT 0,
    total_attempts INTEGER DEFAULT 0,
    favorite_language TEXT DEFAULT '',
    total_execution_time INTEGER DEFAULT 0, -- in milliseconds
    streak_days INTEGER DEFAULT 0,
    last_practice_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create problem_analytics table
CREATE TABLE IF NOT EXISTS problem_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    problem_slug TEXT UNIQUE NOT NULL,
    total_attempts INTEGER DEFAULT 0,
    total_completions INTEGER DEFAULT 0,
    average_execution_time DECIMAL DEFAULT 0, -- in milliseconds
    most_used_language TEXT DEFAULT '',
    difficulty_rating INTEGER DEFAULT 1 CHECK (difficulty_rating BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coding_practices_user_id ON coding_practices(user_id);
CREATE INDEX IF NOT EXISTS idx_coding_practices_problem_slug ON coding_practices(problem_slug);
CREATE INDEX IF NOT EXISTS idx_coding_practices_status ON coding_practices(status);
CREATE INDEX IF NOT EXISTS idx_coding_practices_created_at ON coding_practices(created_at);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_problem_analytics_problem_slug ON problem_analytics(problem_slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_coding_practices_updated_at 
    BEFORE UPDATE ON coding_practices 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at 
    BEFORE UPDATE ON user_progress 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_problem_analytics_updated_at 
    BEFORE UPDATE ON problem_analytics 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE coding_practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your authentication)
-- Note: These policies allow public access for demo purposes
-- In production, you should restrict access based on authenticated users

CREATE POLICY "Allow public read access on coding_practices" 
    ON coding_practices FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access on coding_practices" 
    ON coding_practices FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public update access on coding_practices" 
    ON coding_practices FOR UPDATE 
    USING (true);

CREATE POLICY "Allow public read access on user_progress" 
    ON user_progress FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access on user_progress" 
    ON user_progress FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public update access on user_progress" 
    ON user_progress FOR UPDATE 
    USING (true);

CREATE POLICY "Allow public read access on problem_analytics" 
    ON problem_analytics FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access on problem_analytics" 
    ON problem_analytics FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow public update access on problem_analytics" 
    ON problem_analytics FOR UPDATE 
    USING (true);

-- Insert some sample data for testing
INSERT INTO problem_analytics (problem_slug, total_attempts, total_completions, average_execution_time, most_used_language, difficulty_rating)
VALUES 
    ('two-sum', 5, 3, 45.6, 'JavaScript', 1),
    ('reverse-string', 8, 6, 23.4, 'Python', 1),
    ('fibonacci-sequence', 12, 7, 67.8, 'JavaScript', 2),
    ('binary-search', 6, 4, 34.2, 'C++', 2),
    ('merge-sort', 4, 2, 123.5, 'Java', 3)
ON CONFLICT (problem_slug) DO NOTHING; 