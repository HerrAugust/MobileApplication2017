CREATE DATABASE IF NOT EXISTS mydogcare;

CREATE TABLE IF NOT EXISTS Users    (user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255), phone VARCHAR(255) ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;;
CREATE TABLE IF NOT EXISTS Dog     (collar_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, age INT, name VARCHAR(32), gender VARCHAR(1), own INT UNSIGNED, type VARCHAR(64));
CREATE TABLE IF NOT EXISTS Events   (code INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, note VARCHAR(256) DEFAULT '', vaccine_visit VARCHAR(8) NOT NULL DEFAULT "visit", type INT UNSIGNED, user_id INT unsigned NOT NULL, detail_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS Disease (icd_code INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64));
CREATE TABLE IF NOT EXISTS Breed   (name VARCHAR(64) PRIMARY KEY, origin VARCHAR(64));
CREATE TABLE IF NOT EXISTS Veterinary     (id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64), lastname VARCHAR(64), city VARCHAR(64));

CREATE TABLE IF NOT EXISTS Dog_Veterinary (dog INT UNSIGNED, veterinary INT UNSIGNED, PRIMARY KEY(dog, veterinary));
CREATE TABLE IF NOT EXISTS Dog_Events 	  (dog INT UNSIGNED, event INT UNSIGNED, PRIMARY KEY(dog, event));
CREATE TABLE IF NOT EXISTS Events_Veterinary (event INT UNSIGNED, veterinary INT UNSIGNED, PRIMARY KEY(event, veterinary));

/* Required by professor */
CREATE TABLE `Sessions` (
  `session_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `fk_sessions_users_idx` (`user_id`),
  CONSTRAINT `fk_sessions_constraint` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

ALTER TABLE Dog ADD FOREIGN KEY (own)  REFERENCES Users(user_id);
ALTER TABLE Dog ADD FOREIGN KEY (type) REFERENCES Breed(name);
ALTER TABLE Dog_Veterinary ADD FOREIGN KEY (dog) REFERENCES Dog(collar_id);
ALTER TABLE Dog_Veterinary ADD FOREIGN KEY (veterinary) REFERENCES Veterinary(id);
ALTER TABLE Events_Veterinary ADD FOREIGN KEY (event) REFERENCES Events(code);
ALTER TABLE Events_Veterinary ADD FOREIGN KEY (veterinary) REFERENCES Veterinary(id);
ALTER TABLE Dog_Events ADD FOREIGN KEY (dog) REFERENCES Dog(collar_id);
ALTER TABLE Dog_Events ADD FOREIGN KEY (event) REFERENCES Events(code);
ALTER TABLE Events ADD FOREIGN KEY (type) REFERENCES Disease(icd_code);
ALTER TABLE Events ADD FOREIGN KEY (user_id) REFERENCES Users(user_id);

INSERT INTO Breed (name, origin) VALUES ('Akita', 'Japan'), ('Rottweiler', 'Germany'), ('Bolognese', 'Italy');
INSERT INTO Users (username, password, first_name, last_name, phone, email) VALUES ('agoneri', 'agoneri', 'Agostino', 'Neri', '+3933333333', 'agostino.neri@email.org');
INSERT INTO Veterinary (name, lastname, city) VALUES ('John', 'Smith', 'Split'), ('Mark', 'Rossi', 'Prague');
INSERT INTO Disease (icd_code, name) VALUES (1, 'Rabies'), (2, 'Stomachache'), (3, 'Vomit');

/* To test calendar part */
INSERT INTO Events (note, type, user_id, detail_timestamp) VALUES ('Dr.Strange, bring with a new collar', 1, 1, '2017-07-18 22:01:34');