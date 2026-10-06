CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`assignee` text DEFAULT 'Не назначен',
	`due_date` text,
	`status` text DEFAULT 'В работе',
	`progress` integer DEFAULT 0,
	`created_at` text DEFAULT '2026-10-04T14:59:27.591Z'
);
