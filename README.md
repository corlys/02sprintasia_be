# ERD

![sprintasia_erdver2](https://github.com/user-attachments/assets/5a6f5992-6b47-45dd-b5f2-ad6246a88052)

if image is broken, please refer to the image sprintasia_erdver2.png on the root of the repository

# How To Run The App

- First, make sure you have node installed on your machine

```bash
node -v # shoudl print your node version
```

- Make sure you have postgres client installed, and run this sql script

```bash
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'ongoing',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deadline TIMESTAMP
);

CREATE TABLE sub_tasks (
    id SERIAL PRIMARY KEY,
    task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

INSERT INTO tasks (title, description, status, deadline ) VALUES
('Task 1', 'Description for Task 1', 'ongoing', '2024-08-30 10:00:00'),
('Task 2', 'Description for Task 2', 'completed', '2024-09-15 12:00:00'),
('Task 3', 'Description for Task 3', 'pending', '2024-09-20 15:00:00');

INSERT INTO sub_tasks (task_id, title, completed) VALUES
(1, 'Subtask 1 for Task 1', FALSE),
(1, 'Subtask 2 for Task 1', TRUE),
(2, 'Subtask 1 for Task 2', TRUE),
(3, 'Subtask 1 for Task 3', FALSE),
(3, 'Subtask 2 for Task 3', TRUE);
```

- Afte that make sure you have an environment file `.env` that
  have contents like below. Fill each of the variables with your
  configuration

```bash
# fill each of these, save it as a .env file
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
DB_PORT=
APP_PORT=
```

- lastly, install and run the app using your node package manager

```bash
# i used pnpm in here
pnpm i # will install packagesa

pnpm dev # will run in development mode
```
