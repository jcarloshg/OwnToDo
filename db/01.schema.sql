-- TaskFlow Database Schema
-- Version: 1.0
-- Date: 2026-04-18

-- Create database (run as superuser if needed)
-- CREATE DATABASE taskflow;

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    effort_points INTEGER NOT NULL CHECK (effort_points >= 1 AND effort_points <= 100),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed')),
    due_date DATE,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);

-- Comments
COMMENT ON TABLE tasks IS 'Stores user tasks with effort points tracking';
COMMENT ON COLUMN tasks.id IS 'Unique identifier for the task';
COMMENT ON COLUMN tasks.title IS 'Task title (required, max 200 chars)';
COMMENT ON COLUMN tasks.description IS 'Task description (optional, max 2000 chars)';
COMMENT ON COLUMN tasks.effort_points IS 'Effort estimation (1-100 scale)';
COMMENT ON COLUMN tasks.status IS 'Task status: pending or completed';
COMMENT ON COLUMN tasks.due_date IS 'Optional due date for the task';
COMMENT ON COLUMN tasks.user_id IS 'Owner of the task (foreign key to users)';
COMMENT ON COLUMN tasks.created_at IS 'Timestamp when task was created';
COMMENT ON COLUMN tasks.updated_at IS 'Timestamp when task was last updated';