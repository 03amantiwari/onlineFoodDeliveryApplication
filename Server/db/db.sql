DROP DATABASE IF EXISTS onlinefoodordering_db;
CREATE DATABASE onlinefoodordering_db;
USE onlinefoodordering_db;

CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100),
    phone CHAR(10) 
);


CREATE TABLE food(
    fid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    description TEXT,
    price DECIMAL(9,2),
    image VARCHAR(100) 
);

INSERT INTO food(name,description,price,image)
VALUES ('Pav Bhaji','Bombay-style bhaji made with fresh vegetables and flavorful spices + 2 Pavs [4 Pc] + Onions', 229,'PavBhaji.jpg');

INSERT INTO food(name,description,price,image)
VALUES ('Blueberry Ice Cream','Inspired by the desserts at the local Greek patisseries. This indulgent ice cream is made of tarty blueberries smothered in fine cheesecake. Silky smooth & super creamy!
', 99,'icecream.jpg');