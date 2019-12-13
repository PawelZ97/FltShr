INSERT INTO users("username", "password", "email", "role", "email_verified", "registration_date")
    VALUES ('admin', '$2a$04$CRiFUeohzOfqKIIPuLjK5eeWyb/s6hd2EkMutkFHXXvizBq1ltCiq',
        'admin@fltshr.com', 'ROLE_ADMIN', true, '2019-11-08 23:00:00');

INSERT INTO users("username", "password", "email", "role", "email_verified", "registration_date")
    VALUES ('manager', '$2a$04$/EAn8EzR35CNzNUbQFCCuud0MOWHBuh/KkRvgt0D7Yg9X.IOcZdlO',
        'manager@fltshr.com', 'ROLE_MANAGER', true, '2019-11-08 23:01:01');

INSERT INTO users("username", "password", "email", "role", "email_verified", "registration_date")
    VALUES ('Paweł', '$2a$04$HudGx6JPB57nO6lfP23gC.MHToo1.I3JK9AE.DSPsXdHc205VU6R6',
        'pawel@fltshr.com', 'ROLE_USER', true, '2019-11-01 10:10:10');

INSERT INTO users("username", "password", "email", "role", "email_verified", "registration_date")
    VALUES ('Bartek', '$2a$04$HudGx6JPB57nO6lfP23gC.MHToo1.I3JK9AE.DSPsXdHc205VU6R6',
        'bartek@fltshr.com', 'ROLE_USER', true, '2019-11-02 11:11:11');

INSERT INTO users("username", "password", "email", "role", "email_verified", "registration_date")
    VALUES ('Piotrek', '$2a$04$HudGx6JPB57nO6lfP23gC.MHToo1.I3JK9AE.DSPsXdHc205VU6R6',
        'piotrek@fltshr.com', 'ROLE_USER', true,'2019-11-03 12:12:12');

INSERT INTO shopping_items("name", "description")
VALUES ('Mydło', 'Mydło w płynie');

INSERT INTO shopping_items("name") VALUES ( 'Chlebek' );

INSERT INTO shopping_items("name", "description") VALUES ( 'Papier do drukarki', 'Paper A4 Biały');

INSERT INTO shopping_lists("name", "description", "archived") VALUES ( 'Stonka', 'Spożywcze', false);

INSERT INTO shopping_lists("name", "archived") VALUES ( 'Rosenman' , false);

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
    VALUES ( 1, 1, true, 4, '2019-11-09 10:10:10');

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
    VALUES ( 1, 2, true, 3, '2019-11-10 12:10:10' );

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
    VALUES ( 1, 3, true, 5, '2019-11-20 10:11:10' );

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
    VALUES ( 2, 3, false, null, null );

INSERT INTO expenses_lists(name, is_settled) VALUES ( 'Środki czystości' , false);
INSERT INTO expenses_lists(name, is_settled) VALUES ( 'Jedzonko' , false);
INSERT INTO expenses_lists(name, is_settled) VALUES ( 'Drukowanie' , false);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-08 08:08:08', 'Mydło kupione', null, 'Mydło', 13.80, 1, 4);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
    VALUES ('2019-11-08 08:08:08', 'Fajny płyn', null, 'Płyn do naczyń', 25.00, 1, 4);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
    VALUES ('2019-11-09 09:09:09', 'Philips 60W Ultrabright', null,'Żarówka łazienka', 59.99, 1, 3);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
    VALUES ('2019-11-09 10:10:10', 'Kebsiki z wilanowa', 'PERCENT', 'Kebsiki', 40.00, 2, 3);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-09 10:10:10', 'Żużycie na podstawie stron', 'UNIT', 'Tusze do Drukarki', 38.00, 3, 3);

INSERT INTO expenses("bought_date", "description", "unequal_type", "name", "total", "list", "paid_by")
VALUES ('2019-11-10 10:10:10', 'Ryzy papieru', 'VALUE', 'Papier', 50.00, 3, 3);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
    VALUES (16, 40, null, 4, 3);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
    VALUES (24, 60, null, 4, 4);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
    VALUES (7.3077, null, 10, 5, 3);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
    VALUES (13.1539, null, 18, 5, 4);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
    VALUES (7.3077, null, 10, 5, 5);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
    VALUES (10.2308, null, 14, 5, 5);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (20.0000, null, null, 6, 3);

INSERT INTO expense_unequal("value", "percent", "units", "expense", "used_by")
VALUES (30.0000, null, null, 6, 4);

INSERT INTO queue_chores("name","description", "archived")
    VALUES ( 'Śmieci kuchnia', 'Wyniesienie śmieci z kuchni', false);

INSERT INTO assigned_queue_chore("assigned_user","chore", "assign_date", "done", "done_date")
    VALUES ( 4, 1,  '2019-10-25 10:00:00', true, '2019-10-30 15:00:00');
INSERT INTO assigned_queue_chore("assigned_user","chore", "assign_date", "done", "done_date")
    VALUES ( 5, 1,  '2019-10-30 15:00:00', true, '2019-11-01 22:00:00');
INSERT INTO assigned_queue_chore("assigned_user","chore", "assign_date", "done", "done_date")
    VALUES ( 3, 1,  '2019-11-01 22:00:00', true, '2019-11-03 10:00:00');
INSERT INTO assigned_queue_chore("assigned_user","chore", "assign_date", "done", "done_date")
    VALUES ( 4, 1,  '2019-11-03 10:00:00', false, null);


INSERT INTO frequent_chores("name","description","duration_days","frequency_days", "archived")
    VALUES ( 'Sprzątanie łazienki', 'Cotygodniowe sprzątanie łazienki', 7, 21, false);
INSERT INTO frequent_chores("name","description","duration_days","frequency_days", "archived")
    VALUES ( 'Sprzątanie kuchni', 'Cotygodniowe sprzątanie kuchni', 7, 21 , false);
INSERT INTO frequent_chores("name","description","duration_days","frequency_days", "archived")
    VALUES ( 'Sprzątanie korytarza', 'Cotygodniowe sprzątanie korytarza', 7, 21 , false);

INSERT INTO assigned_frequent_chore("assigned_user","frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES ( 5, 1,  '2019-10-14 01:00:00', true ,  true, '2019-10-19 18:00:00');
INSERT INTO assigned_frequent_chore("assigned_user","frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES ( 3, 1,  '2019-10-21 01:00:00', true ,  true, '2019-10-26 15:30:00');
INSERT INTO assigned_frequent_chore("assigned_user","frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES ( 5, 1,  '2019-11-04 01:00:00', false , true, '2019-11-09 17:00:00');
INSERT INTO assigned_frequent_chore("assigned_user","frequent_chore", "assign_date", "reassigned", "done", "done_date")
VALUES ( 3, 1,  '2019-11-11 01:00:00', false , false , null);
