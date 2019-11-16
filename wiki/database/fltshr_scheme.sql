CREATE TABLE "advertisements" (
                                  "id" bigint PRIMARY KEY NOT NULL,
                                  "content" varchar(200) NOT NULL,
                                  "creator" bigint NOT NULL,
                                  "creation_date" timestamp NOT NULL,
                                  "expiration_date" timestamp NOT NULL
);

CREATE TABLE "advertisements_board" (
                                        "id" bigint PRIMARY KEY NOT NULL,
                                        "user" bigint NOT NULL,
                                        "advertisement" bigint NOT NULL
);

CREATE TABLE "bills" (
                         "id" bigint PRIMARY KEY NOT NULL,
                         "name" varchar(50) NOT NULL,
                         "amount" bigint,
                         "frequency_days" bigint NOT NULL,
                         "start_date" timestamp NOT NULL,
                         "created_by" bigint NOT NULL,
                         "created_date" timestamp NOT NULL
);

CREATE TABLE "queue_chores_assigned" (
                                         "id" bigint PRIMARY KEY NOT NULL,
                                         "user" bigint NOT NULL,
                                         "chore" bigint NOT NULL,
                                         "assign_date" timestamp NOT NULL,
                                         "done" boolean NOT NULL,
                                         "done_date" timestamp NOT NULL
);

CREATE TABLE "frequent_chores_assigned" (
                                            "id" bigint PRIMARY KEY NOT NULL,
                                            "user" bigint NOT NULL,
                                            "chore" bigint NOT NULL,
                                            "assign_date" timestamp NOT NULL,
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
                            "name" varchar(50) NOT NULL,
                            "total" bigint NOT NULL,
                            "is_equal" boolean NOT NULL,
                            "list" bigint NOT NULL,
                            "paid_by" bigint NOT NULL,
                            "timestamp" timestamp NOT NULL,
                            "description" varchar(100)
);

CREATE TABLE "expenses_lists" (
                                  "id" bigint PRIMARY KEY NOT NULL,
                                  "name" varchar(50) NOT NULL
);

CREATE TABLE "frequent_chores" (
                                   "id" bigint PRIMARY KEY NOT NULL,
                                   "description" varchar(100) NOT NULL,
                                   "duration_days" bigint NOT NULL,
                                   "frequency_days" bigint NOT NULL
);

CREATE TABLE "queue_chores" (
                                "id" bigint PRIMARY KEY NOT NULL,
                                "description" varchar(100) NOT NULL
);

CREATE TABLE "shopping_entries" (
                                    "id" bigint PRIMARY KEY NOT NULL,
                                    "shopping_list" bigint NOT NULL,
                                    "item" bigint NOT NULL,
                                    "bought_by" boolean NOT NULL,
                                    "bought_date" timestamp NOT NULL,
                                    "buyer" bigint NOT NULL
);

CREATE TABLE "shopping_items" (
                                  "id" bigint PRIMARY KEY NOT NULL,
                                  "description" varchar(50) NOT NULL
);

CREATE TABLE "shopping_lists" (
                                  "id" bigint PRIMARY KEY NOT NULL,
                                  "desription" varchar(100) NOT NULL
);

CREATE TABLE "users" (
                         "id" bigint PRIMARY KEY NOT NULL,
                         "username" varchar(20) NOT NULL,
                         "password" varchar(20) NOT NULL,
                         "email" varchar(30) NOT NULL,
                         "role" varchar(10) NOT NULL,
                         "registration_date" timestamp NOT NULL
);

ALTER TABLE "advertisements_board" ADD FOREIGN KEY ("advertisement") REFERENCES "advertisements" ("id");

ALTER TABLE "advertisements_board" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "advertisements" ADD FOREIGN KEY ("creator") REFERENCES "users" ("id");

ALTER TABLE "bills" ADD FOREIGN KEY ("created_by") REFERENCES "users" ("id");

ALTER TABLE "frequent_chores_assigned" ADD FOREIGN KEY ("chore") REFERENCES "frequent_chores" ("id");

ALTER TABLE "expense_unequal" ADD FOREIGN KEY ("expense") REFERENCES "expenses" ("id");

ALTER TABLE "expense_unequal" ADD FOREIGN KEY ("used_by") REFERENCES "users" ("id");

ALTER TABLE "expenses" ADD FOREIGN KEY ("paid_by") REFERENCES "users" ("id");

ALTER TABLE "queue_chores_assigned" ADD FOREIGN KEY ("chore") REFERENCES "queue_chores" ("id");

ALTER TABLE "shopping_entries" ADD FOREIGN KEY ("item") REFERENCES "shopping_items" ("id");

ALTER TABLE "shopping_entries" ADD FOREIGN KEY ("shopping_list") REFERENCES "shopping_lists" ("id");

ALTER TABLE "queue_chores_assigned" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");

ALTER TABLE "shopping_entries" ADD FOREIGN KEY ("buyer") REFERENCES "users" ("id");

ALTER TABLE "expenses" ADD FOREIGN KEY ("list") REFERENCES "expenses_lists" ("id");

ALTER TABLE "frequent_chores_assigned" ADD FOREIGN KEY ("user") REFERENCES "users" ("id");