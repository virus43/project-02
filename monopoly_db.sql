SET SQL_SAFE_UPDATES=0;

DROP DATABASE IF EXISTS monopoly_db;

CREATE DATABASE monopoly_db;

USE monopoly_db;

CREATE TABLE players (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  savings DECIMAL DEFAULT 1500
);

CREATE TABLE cities (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  city_name VARCHAR(45) NOT NULL,
  price DECIMAL,
  rent DECIMAL,
  owner_id INT NULL,
  CONSTRAINT fk_player FOREIGN KEY (owner_id) REFERENCES players(id)
);

-- insert player records to test addition of new player
INSERT INTO players(name)
values ("mike");

-- insert set of city information
INSERT INTO cities(city_name,price,rent)
values ("new york",500,50);

-- test update on cities table to update owner id
UPDATE cities SET owner_id = 1
where city_name = "new york";

-- test update on players table to update savings
UPDATE players SET savings = 1300
where name = "mike";

-- joined table query
select * 
from players
INNER JOIN cities ON players.id=cities.owner_id
