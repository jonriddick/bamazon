DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE items(
  bamazon_id INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  price INT NOT NULL default 0,
  quantity INT NOT NULL default 0,
    PRIMARY KEY (bamazon_id)
);

INSERT INTO items (product, department, price, quantity)
VALUES 
	("Julio Jones Jersey", "Sports", 100, 30),
    ("Matt Ryan Jersey", "Sports", 100, 20),
    ("Custom Falcons Jersey", "Sports", 120, 10),
    ("Powerade Zero Case of 12", "Grocery", 13.50, 50),
    ("Red Bull", "Grocery", 100, 20),
    ("Samsung S7 Edge", "Mobile Phones", 500, 10),
    ("Crappy iPhone 8", "Mobile Phones", 10000, 2),
    ("Oakley Gas Can", "Sun Glasses", 100, 8),
    ("Ray-Ban Aviators", "Sun Glasses", 80, 12),
    ("Pitbull Poster", "Art", 100000, 1);

select * from items