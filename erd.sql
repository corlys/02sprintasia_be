-- Create the tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deadline TIMESTAMP,
);

-- Create the sub_tasks table
CREATE TABLE sub_tasks (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Insert dummy data into tasks
INSERT INTO tasks (title, description, status, deadline, progress) VALUES
('Task 1', 'Description for Task 1', 'ongoing', '2024-08-30 10:00:00'),
('Task 2', 'Description for Task 2', 'completed', '2024-09-15 12:00:00'),
('Task 3', 'Description for Task 3', 'pending', '2024-09-20 15:00:00');

-- Insert dummy data into sub_tasks
INSERT INTO sub_tasks (task_id, title, completed) VALUES
(1, 'Subtask 1 for Task 1', FALSE),
(1, 'Subtask 2 for Task 1', TRUE),
(2, 'Subtask 1 for Task 2', TRUE),
(3, 'Subtask 1 for Task 3', FALSE),
(3, 'Subtask 2 for Task 3', TRUE);

