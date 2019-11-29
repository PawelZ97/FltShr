CREATE TABLE "assigned_queue_chore" (
  "id" bigint PRIMARY KEY NOT NULL,
  "assigned_user" bigint NOT NULL,
  "chore" bigint NOT NULL,
  "assign_date" timestamp NOT NULL,
  "done" boolean NOT NULL,
  "done_date" timestamp NOT NULL
);

CREATE TABLE "assigned_frequent_chore" (
  "id" bigint PRIMARY KEY NOT NULL,
  "assigned_user" bigint NOT NULL,
  "frequent_chore" bigint NOT NULL,
  "assign_date" timestamp NOT NULL,
  "reassigned" boolean NOT NULL,
  "done" boolean NOT NULL,
  "done_date" timestamp NOT NULL
);

CREATE TABLE "expense_unequal" (
  "id" bigint PRIMARY KEY NOT NULL,
  "used_by" bigint NOT NULL,
  "expense" bigint NOT NULL,
  "percent" bigint,
  "units" bigint
);

CREATE TABLE "expenses" (
  "id" bigint PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255),
  "total" bigint NOT NULL,
  "is_equal" boolean NOT NULL,
  "list" bigint NOT NULL,
  "paid_by" bigint NOT NULL,
  "bought_date" timestamp NOT NULL
);

CREATE TABLE "expenses_lists" (
  "id" bigint PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "is_settled" boolean NOT NULL
);

CREATE TABLE "frequent_chores" (
  "id" bigint PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255) NOT NULL,
  "duration_days" bigint NOT NULL,
  "frequency_days" bigint NOT NULL,
  "archived" boolean NOT NULL
);

CREATE TABLE "queue_chores" (
  "id" bigint PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" varchar(255) NOT NULL,
  "archived" boolean NOT NULL
);

CREATE TABLE "shopping_entries" (
  "id" bigint PRIMARY KEY NOT NULL,
  "shopping_list" bigint NOT NULL,
  "item" bigint NOT NULL,
  "bought_by" bigint NOT NULL,
  "bought_date" timestamp NOT NULL,
  "bought" boolean NOT NULL
);

CREATE TABLE "shopping_items" (
  "id" bigint PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "desription" varchar(255) NOT NULL
);

CREATE TABLE "shopping_lists" (
  "id" bigint PRIMARY KEY NOT NULL,
  "name" varchar(255) NOT NULL,
  "desription" varchar(255) NOT NULL,
  "archived" boolean NOT NULL
);

CREATE TABLE "users" (
  "id" bigint PRIMARY KEY NOT NULL,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "email_verified" boolean NOT NULL,
  "role" varchar(255) NOT NULL,
  "registration_date" timestamp NOT NULL
);

ALTER TABLE "assigned_frequent_chore" ADD FOREIGN KEY ("frequent_chore") REFERENCES "frequent_chores" ("id");

ALTER TABLE "expense_unequal" ADD FOREIGN KEY ("expense") REFERENCES "expenses" ("id");

ALTER TABLE "expense_unequal" ADD FOREIGN KEY ("used_by") REFERENCES "users" ("id");

ALTER TABLE "expenses" ADD FOREIGN KEY ("paid_by") REFERENCES "users" ("id");

ALTER TABLE "assigned_queue_chore" ADD FOREIGN KEY ("chore") REFERENCES "queue_chores" ("id");

ALTER TABLE "shopping_entries" ADD FOREIGN KEY ("item") REFERENCES "shopping_items" ("id");

ALTER TABLE "shopping_entries" ADD FOREIGN KEY ("shopping_list") REFERENCES "shopping_lists" ("id");

ALTER TABLE "assigned_queue_chore" ADD FOREIGN KEY ("assigned_user") REFERENCES "users" ("id");

ALTER TABLE "shopping_entries" ADD FOREIGN KEY ("bought_by") REFERENCES "users" ("id");

ALTER TABLE "expenses" ADD FOREIGN KEY ("list") REFERENCES "expenses_lists" ("id");

ALTER TABLE "assigned_frequent_chore" ADD FOREIGN KEY ("assigned_user") REFERENCES "users" ("id");
