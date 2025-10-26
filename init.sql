CREATE TABLE
    IF NOT EXISTS PRODUCTS (
        ID SERIAL PRIMARY KEY,
        NAME VARCHAR(200) NOT NULL,
        PRICE DECIMAL NOT NULL,
        SUPPLIER VARCHAR(50) NOT NULL
    );

INSERT INTO
    PRODUCTS (NAME, PRICE, SUPPLIER)
VALUES
    ('Laptop Gamer', 5999.90, 'Dell'),
    ('Mouse Sem Fio', 89.99, 'Logitech'),
    ('Monitor 24"', 749.50, 'Samsung'),
    ('Teclado Mecânico', 329.00, 'Redragon'),
    ('Cadeira Gamer', 1199.00, 'DT3 Sports'),
    ('Headset Gamer', 259.90, 'HyperX'),
    ('SSD 1TB NVMe', 399.90, 'Kingston'),
    ('Webcam Full HD', 149.90, 'Logitech'),
    ('Mousepad XL', 49.90, 'Fortrek'),
    ('Microfone Condensador', 189.90, 'Fifine');