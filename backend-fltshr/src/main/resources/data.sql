INSERT INTO users(username, password, email, role, registration_date)
VALUES ('paweł', '$2a$04$HudGx6JPB57nO6lfP23gC.MHToo1.I3JK9AE.DSPsXdHc205VU6R6',
        'pawel@fltshr.com', 'ROLE_USER', '2019-11-01 10:10:10');

INSERT INTO users(username, password, email, role, registration_date)
VALUES ('bartek', '$2a$04$HudGx6JPB57nO6lfP23gC.MHToo1.I3JK9AE.DSPsXdHc205VU6R6',
        'bartek@fltshr.com', 'ROLE_USER', '2019-11-02 11:11:11');

INSERT INTO users(username, password, email, role, registration_date)
VALUES ('piotrek', '$2a$04$HudGx6JPB57nO6lfP23gC.MHToo1.I3JK9AE.DSPsXdHc205VU6R6',
        'piotrek@fltshr.com', 'ROLE_USER', '2019-11-03 12:12:12');

INSERT INTO users(username, password, email, role, registration_date)
VALUES ('admin', '$2a$04$CRiFUeohzOfqKIIPuLjK5eeWyb/s6hd2EkMutkFHXXvizBq1ltCiq',
        'admin@fltshr.com', 'ROLE_ADMIN', '2019-11-08 23:00:00');

INSERT INTO users(username, password, email, role, registration_date)
VALUES ('manager', '$2a$04$/EAn8EzR35CNzNUbQFCCuud0MOWHBuh/KkRvgt0D7Yg9X.IOcZdlO',
        'manager@fltshr.com', 'ROLE_MANAGER', '2019-11-08 23:01:01');


INSERT INTO shopping_items(description) VALUES ( 'Mydełko' );

INSERT INTO shopping_items(description) VALUES ( 'Chlebek' );

INSERT INTO shopping_items(description) VALUES ( 'Papier do drukarki' );

INSERT INTO shopping_lists(description) VALUES ( 'Stonka' );

INSERT INTO shopping_lists(description) VALUES ( 'Rosenman' );

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES ( 1, 1, true, 2, null );

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES ( 1, 2, true, 1, null );

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES ( 1, 3, true, 2, null );

INSERT INTO shopping_entries(shopping_list, item, bought, bought_by, bought_date)
VALUES ( 2, 3, false, null, null );

INSERT INTO expenses_lists(name) VALUES ( 'Środki czystości' );
INSERT INTO expenses_lists(name) VALUES ( 'Jedzonko' );
INSERT INTO expenses_lists(name) VALUES ( 'Drukowanie' );

INSERT INTO expenses("bought_date", "description", "is_equal", "name", "total", "list", "paid_by")
VALUES ('2019-11-08 08:08:08', 'Mydełko kupione', true, 'Mydełko', 13.80, 1, 2);

INSERT INTO expenses("bought_date", "description", "is_equal", "name", "total", "list", "paid_by")
VALUES ('2019-11-08 08:08:08', 'Fajny płyn', true, 'Płyn do naczyń', 25.00, 1, 2);

INSERT INTO expenses("bought_date", "description", "is_equal", "name", "total", "list", "paid_by")
VALUES ('2019-11-09 09:09:09', 'Philips 60W Ultrabright', true,'Żarówka łazienka', 59.99, 1, 1);

INSERT INTO expenses("bought_date", "description", "is_equal", "name", "total", "list", "paid_by")
VALUES ('2019-11-09 10:10:10', 'Kebsiki z wilanowa', false, 'Kebsiki', 40.00, 2, 1);

INSERT INTO expenses("bought_date", "description", "is_equal", "name", "total", "list", "paid_by")
VALUES ('2019-11-09 10:10:10', 'Żużycie na podstawie stron', false, 'Tusze do Drukarki', 38.00, 3, 1);

INSERT INTO expense_usages("percent", "units", "expense", "used_by")
VALUES ( 40, null, 4, 1);

INSERT INTO expense_usages("percent", "units", "expense", "used_by")
VALUES ( 60, null, 4, 2);

INSERT INTO expense_usages("percent", "units", "expense", "used_by")
VALUES ( null, 10, 5, 1);

INSERT INTO expense_usages("percent", "units", "expense", "used_by")
VALUES ( null, 18, 5, 2);

INSERT INTO expense_usages("percent", "units", "expense", "used_by")
VALUES ( null, 10, 5, 3);

INSERT INTO expense_usages("percent", "units", "expense", "used_by")
VALUES ( null, 14, 5, 3);



