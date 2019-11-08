CREATE TABLE "advertisements" (
  "id" int PRIMARY KEY NOT NULL,
  "content" varchar(200) NOT NULL,
  "creator" int NOT NULL,
  "creation_date" date NOT NULL,
  "expiration_date" date NOT NULL
);

CREATE TABLE "advertisements_board" (
  "id" int PRIMARY KEY NOT NULL,
  "user" int NOT NULL,
  "advertisement" int NOT NULL
);

CREATE TABLE "bills" (
  "id" int PRIMARY KEY NOT NULL,
  "name" varchar(50) NOT NULL,
  "amount" int,
  "frequency_days" int NOT NULL,
  "start_date" date NOT NULL,
  "created_by" int NOT NULL,
  "created_date" date NOT NULL
);

CREATE TABLE "chores_assigned" (
  "id" int PRIMARY KEY NOT NULL,
  "user" int NOT NULL,
  "chore" int NOT NULL,
  "assign_date" date NOT NULL,
  "done" boolean NOT NULL,
  "done_date" date NOT NULL
);

CREATE TABLE "expense_usages" (
  "id" int PRIMARY KEY NOT NULL,
  "used_by" int NOT NULL,
  "expense" int NOT NULL,
  "type" varchar(10) NOT NULL,
  "percent" int,
  "units" int
);

CREATE TABLE "expenses" (
  "id" int PRIMARY KEY NOT NULL,
  "name" varchar(50) NOT NULL,
  "total" int NOT NULL,
  "paid_by" int NOT NULL,
  "date" date NOT NULL,
  "description" varchar(100)
);

CREATE TABLE "frequent_chores" (
  "id" int PRIMARY KEY NOT NULL,
  "description" varchar(100) NOT NULL,
  "duration_days" int NOT NULL,
  "frequency_days" int NOT NULL
);

CREATE TABLE "queue_chores" (
  "id" int PRIMARY KEY NOT NULL,
  "description" varchar(100) NOT NULL
);

CREATE TABLE "shopping_data" (
  "id" int PRIMARY KEY NOT NULL,
  "shopping_list" int NOT NULL,
  "item" int NOT NULL,
  "bought" boolean NOT NULL,
  "bought_date" date NOT NULL,
  "buyer" int NOT NULL
);

CREATE TABLE "shopping_items" (
  "id" int PRIMARY KEY NOT NULL,
  "description" varchar(50) NOT NULL
);

CREATE TABLE "shopping_lists" (
  "id" int PRIMARY KEY NOT NULL,
  "description" varchar(100) NOT NULL,
  "shopping_data_id" int NOT NULL
);

CREATE TABLE "users" (
  "id" int PRIMARY KEY NOT NULL,
  "username" varchar(20) NOT NULL,
  "password" varchar(20) NOT NULL,
  "email" varchar(30) NOT NULL,
  "role" varchar(10) NOT NULL,
  "registration_date" date NOT NULL
);

ALTER TABLE "advertisements_board" ADD FOREIGN KEY ("advertisement") REFERENCES "advertisements" ("id");

ALTER TABLE "advertisements_board" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "advertisements" ADD FOREIGN KEY ("creator") REFERENCES "users" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "chores_assigned" ADD FOREIGN KEY ("chore") REFERENCES "frequent_chores" ("id");

ALTER TABLE "expense_usages" ADD FOREIGN KEY ("expense") REFERENCES "expenses" ("id");

ALTER TABLE "expense_usages" ADD FOREIGN KEY ("used_by") REFERENCES "users" ("id");

ALTER TABLE "expenses" ADD FOREIGN KEY ("paid_by") REFERENCES "users" ("id");

ALTER TABLE "chores_assigned" ADD FOREIGN KEY ("chore") REFERENCES "queue_chores" ("id");

ALTER TABLE "shopping_data" ADD FOREIGN KEY ("item") REFERENCES "shopping_items" ("id");

ALTER TABLE "shopping_data" ADD FOREIGN KEY ("shopping_list") REFERENCES "shopping_lists" ("id");

ALTER TABLE "chores_assigned" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "shopping_data" ADD FOREIGN KEY ("buyer") REFERENCES "users" ("id");
