CREATE DATABASE IF NOT EXISTS mydogcare;

CREATE TABLE IF NOT EXISTS Costumer    (id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(32), lastname VARCHAR(32), phone VARCHAR(64) );
CREATE TABLE IF NOT EXISTS Dog     (collar_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, age INT, name VARCHAR(32), gender VARCHAR(1), own INT UNSIGNED, type VARCHAR(64));
CREATE TABLE IF NOT EXISTS Episode   (code INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, note VARCHAR(256), type INT UNSIGNED);
CREATE TABLE IF NOT EXISTS Disease (icd_code INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64));
CREATE TABLE IF NOT EXISTS Breed   (name VARCHAR(64) PRIMARY KEY, origin VARCHAR(64));
CREATE TABLE IF NOT EXISTS Veterinary     (id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64), lastname VARCHAR(64), city VARCHAR(64));

CREATE TABLE IF NOT EXISTS Dog_Veterinary (dog INT UNSIGNED, veterinary INT UNSIGNED, PRIMARY KEY(dog, veterinary));
CREATE TABLE IF NOT EXISTS Dog_Episode 	  (dog INT UNSIGNED, episode INT UNSIGNED, PRIMARY KEY(dog, episode));
CREATE TABLE IF NOT EXISTS Episode_Veterinary (episode INT UNSIGNED, veterinary INT UNSIGNED, PRIMARY KEY(episode, veterinary));
CREATE TABLE IF NOT EXISTS Episode_Costumer 		(episode INT UNSIGNED, costumer INT UNSIGNED, detail TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(episode, costumer));

ALTER TABLE Dog ADD FOREIGN KEY (own)  REFERENCES Costumer(id);
ALTER TABLE Dog ADD FOREIGN KEY (type) REFERENCES Breed(name);
ALTER TABLE Dog_Veterinary ADD FOREIGN KEY (dog) REFERENCES Dog(collar_id);
ALTER TABLE Dog_Veterinary ADD FOREIGN KEY (veterinary) REFERENCES Veterinary(id);
ALTER TABLE Episode_Veterinary ADD FOREIGN KEY (episode) REFERENCES Episode(code);
ALTER TABLE Episode_Veterinary ADD FOREIGN KEY (veterinary) REFERENCES Veterinary(id);
ALTER TABLE Dog_Episode ADD FOREIGN KEY (dog) REFERENCES Dog(collar_id);
ALTER TABLE Dog_Episode ADD FOREIGN KEY (episode) REFERENCES Episode(code);
ALTER TABLE Episode ADD FOREIGN KEY (type) REFERENCES Disease(icd_code);

INSERT INTO Breed (name, origin) VALUES ('Akita', 'Japan'), ('Rottweiler', 'Germany'), ('Bolognese', 'Italy');
INSERT INTO Costumer (name, lastname, phone) VALUES ('Agostino', 'Neri', '+3933333333');
INSERT INTO Veterinary (name, lastname, city) VALUES ('John', 'Smith', 'Split'), ('Mark', 'Rossi', 'Prague');
INSERT INTO Disease (icd_code, name) VALUES (1, 'Rabies'), (2, 'Stomachache'), (3, 'Vomit');
