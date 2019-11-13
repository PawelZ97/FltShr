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

INSERT INTO shopping_items(description) VALUES ( 'Soap' );

INSERT INTO shopping_items(description) VALUES ( 'Bread' );

INSERT INTO shopping_items(description) VALUES ( 'Printing Paper' );

INSERT INTO shopping_lists(description) VALUES ( 'Actual' );

INSERT INTO shopping_lists(description) VALUES ( 'For Printing' );

INSERT INTO shopping(shopping_list, item, bought, bought_date)
VALUES ( 1, 1, false, null );

INSERT INTO shopping(shopping_list, item, bought, bought_date)
VALUES ( 1, 2, false, null );

INSERT INTO shopping(shopping_list, item, bought, bought_date)
VALUES ( 1, 2, false, null );

INSERT INTO shopping(shopping_list, item, bought, bought_date)
VALUES ( 2, 3, false, null );
