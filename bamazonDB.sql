CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
 id INTEGER NOT NULL auto_increment,

product_name VARCHAR(100),

department_name VARCHAR(100),

price DECIMAL(60,2),

stock_quantity INTEGER(200),
PRIMARY KEY(id)

);

SELECT * FROM products;
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("goPro", "camera", 100, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Schwin", "Bicycle", 200, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Garnier", "Conditioner", 10, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("neutrogena", "hygiene", 100, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("neutrogena", "hygiene", 100, 200)