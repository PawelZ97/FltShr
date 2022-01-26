-- testingPassword: admin
INSERT INTO users("username", "password", "request_deactivation",
                  "deactivated", "email", "email_verified", "role", "registration_date")
VALUES ('admin', '$2a$04$CRiFUeohzOfqKIIPuLjK5eeWyb/s6hd2EkMutkFHXXvizBq1ltCiq',
        false, false, 'admin@fltshr.com', true, 'ROLE_ADMIN', '2019-11-08 23:00:00');

-- testingPassword: 123456
INSERT INTO users("username", "password", "request_deactivation",
                  "deactivated", "email", "email_verified", "role", "registration_date")
VALUES ('Paweł', '$2a$10$Z0DthQr8NLGd/iZo2Xv8Q..FdP4XN8SsmtTrmvmKOAuLQGv/BrEWG',
        false, false, 'pawel@fltshr.com', true, 'ROLE_MANAGER', '2019-11-01 10:10:10');

INSERT INTO users("username", "password", "request_deactivation",
                  "deactivated", "email", "email_verified", "role", "registration_date")
VALUES ('Michał', '$2a$10$Z0DthQr8NLGd/iZo2Xv8Q..FdP4XN8SsmtTrmvmKOAuLQGv/BrEWG',
        false, false, 'michal@fltshr.com', true, 'ROLE_USER', '2019-11-02 11:11:11');

INSERT INTO users("username", "password", "request_deactivation",
                  "deactivated", "email", "email_verified", "role", "registration_date")
VALUES ('Darek', '$2a$10$Z0DthQr8NLGd/iZo2Xv8Q..FdP4XN8SsmtTrmvmKOAuLQGv/BrEWG',
        false, false, 'darek@fltshr.com', true, 'ROLE_USER', '2019-11-03 12:12:12');

INSERT INTO shopping_items("name", "description")
VALUES ('Mydło', 'Mydło w płynie');

INSERT INTO shopping_items("name", "description")
VALUES ('Masło orzechowe', 'Masło orzechowe 1g x 3szt');

INSERT INTO shopping_items("name", "description")
VALUES ('Papier do drukarki', 'Paper A4 Biały');

INSERT INTO shopping_items("name", "description")
VALUES ('Roleta', 'Roleta 60x120cm');

INSERT INTO shopping_lists("name", "description", "archived")
VALUES ('Market Spożywczy', 'Spożywcze', false);

INSERT INTO shopping_lists("name", "description", "archived")
VALUES ('Drogeria', 'Środki czystości', false);

INSERT INTO shopping_lists("name", "description", "archived")
VALUES ('Market Budowlany', 'Zakupy Budex', false);

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES (1, 1, true, 3, '2019-12-27 10:10:10');

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES (1, 2, true, 2, '2019-12-28 12:10:10');

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES (1, 3, true, 4, '2019-12-29 10:11:10');

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES (2, 3, false, null, null);

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES (3, 4, false, null, null);

INSERT INTO expenses_lists(name, is_settled)
VALUES ('Środki czystości', false);
INSERT INTO expenses_lists(name, is_settled)
VALUES ('Jedzenie', false);
INSERT INTO expenses_lists(name, is_settled)
VALUES ('Druk', false);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-08 08:08:08', 'Mydło 500ml', null, 'Mydło', 13.80, 1, 3);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-08 08:08:08', 'Płyn 700ml', null, 'Płyn do naczyń', 25.00, 1, 3);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-09 09:09:09', '60W Ultrabright', null, 'Żarówka łazienka', 59.99, 1, 2);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2020-01-03 10:16:01', 'Pizza z dowozem', 'UNIT', 'Włoska Pizza', 32.00, 2, 2);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2020-01-01 15:11:37', 'Burgery na Śródmieściu', 'VALUE', 'Burgery', 48.00, 2, 3);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-12-28 11:14:14', 'Brak', null, 'Naleśniki', 63.00, 2, 3);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-09 10:10:10', 'Żużycie na podstawie stron', 'UNIT', 'Tusze do Drukarki', 38.00, 3, 2);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-10 10:10:10', 'Ryzy papieru', 'VALUE', 'Papier', 50.00, 3, 2);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (12, null, 3, 4, 2);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (12, null, 3, 4, 3);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (8, null, 2, 4, 4);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (27, null, null, 5, 2);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (21, null, null, 5, 3);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (7.3077, null, 10, 7, 4);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (10.2308, null, 14, 7, 4);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (20, null, null, 8, 2);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (30, null, null, 8, 3);

INSERT INTO queue_chores("name", "description", "archived")
VALUES ('Śmieci kuchnia', 'Wyniesienie śmieci z kuchni', false);

INSERT INTO assigned_queue_chore("assigned_user", "chore", "assign_date", "done", "done_date")
VALUES (3, 1, '2019-12-21 10:00:00', true, '2019-10-30 15:00:00');
INSERT INTO assigned_queue_chore("assigned_user", "chore", "assign_date", "done", "done_date")
VALUES (4, 1, '2019-12-24 15:00:00', true, '2019-11-01 22:00:00');
INSERT INTO assigned_queue_chore("assigned_user", "chore", "assign_date", "done", "done_date")
VALUES (2, 1, '2019-12-28 22:00:00', true, '2019-11-03 10:00:00');
INSERT INTO assigned_queue_chore("assigned_user", "chore", "assign_date", "done", "done_date")
VALUES (3, 1, '2020-12-31 14:32:16', false, null);


INSERT INTO frequent_chores("name", "description", "duration_days", "frequency_days", "archived")
VALUES ('Sprzątanie łazienki', 'Cotygodniowe sprzątanie łazienki', 7, 21, false);
INSERT INTO frequent_chores("name", "description", "duration_days", "frequency_days", "archived")
VALUES ('Sprzątanie kuchni', 'Cotygodniowe sprzątanie kuchni', 7, 21, false);
INSERT INTO frequent_chores("name", "description", "duration_days", "frequency_days", "archived")
VALUES ('Sprzątanie korytarza', 'Cotygodniowe sprzątanie korytarza', 7, 21, false);

INSERT INTO assigned_frequent_chore("assigned_user", "frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES (3, 1, '2019-12-16 01:00:00', true, true, '2019-12-20 18:00:00');
INSERT INTO assigned_frequent_chore("assigned_user", "frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES (4, 1, '2019-12-23 01:00:00', true, true, '2019-12-24 15:30:00');
INSERT INTO assigned_frequent_chore("assigned_user", "frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES (2, 1, '2019-12-30 01:00:00', false, true, '2020-01-01 17:00:00');
INSERT INTO assigned_frequent_chore("assigned_user", "frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES (3, 1, '2020-01-06 01:00:00', false, false, null);
