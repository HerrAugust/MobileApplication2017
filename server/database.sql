CREATE DATABASE IF NOT EXISTS mydogcare;

CREATE TABLE IF NOT EXISTS Users    (userid INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), phone VARCHAR(255) ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;
CREATE TABLE IF NOT EXISTS Dog     (collarid INT UNSIGNED PRIMARY KEY, age INT, name VARCHAR(32), gender VARCHAR(1), own INT UNSIGNED, breedid INT UNSIGNED, date_birth DATE DEFAULT "1980-01-01", src VARCHAR(255));
CREATE TABLE IF NOT EXISTS Events   (code INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, note VARCHAR(256) DEFAULT '', vaccinevisit VARCHAR(8) NOT NULL DEFAULT "visit", starred BOOLEAN DEFAULT false, type INT UNSIGNED, userid INT UNSIGNED NOT NULL, dogid INT NOT NULL, detailtimestamp_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP, detailtimestamp_end TIMESTAMP DEFAULT CURRENT_TIMESTAMP, place VARCHAR(256) DEFAULT "");
CREATE TABLE IF NOT EXISTS Disease (icdcode INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64));
CREATE TABLE IF NOT EXISTS Breed   (id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64), origin VARCHAR(64));
CREATE TABLE IF NOT EXISTS Veterinary     (id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT, name VARCHAR(64), lastname VARCHAR(64), city VARCHAR(64));

CREATE TABLE IF NOT EXISTS DogVeterinary (dog INT UNSIGNED, veterinary INT UNSIGNED, PRIMARY KEY(dog, veterinary));
CREATE TABLE IF NOT EXISTS EventsVeterinary (event INT UNSIGNED, veterinary INT UNSIGNED, PRIMARY KEY(event, veterinary));

/* Required by professor */
CREATE TABLE `Sessions` (
  `sessionid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `userid` int(10) unsigned NOT NULL,
  PRIMARY KEY (`sessionid`),
  KEY `fksessionsusersidx` (`userid`),
  CONSTRAINT `fksessionsconstraint` FOREIGN KEY (`userid`) REFERENCES `Users` (`userid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

ALTER TABLE Dog ADD FOREIGN KEY (own)  REFERENCES Users(userid);
ALTER TABLE Dog ADD FOREIGN KEY (breedid) REFERENCES Breed(id);
ALTER TABLE DogVeterinary ADD FOREIGN KEY (dog) REFERENCES Dog(collarid);
ALTER TABLE DogVeterinary ADD FOREIGN KEY (veterinary) REFERENCES Veterinary(id);
ALTER TABLE EventsVeterinary ADD FOREIGN KEY (event) REFERENCES Events(code);
ALTER TABLE EventsVeterinary ADD FOREIGN KEY (veterinary) REFERENCES Veterinary(id);
ALTER TABLE DogEvents ADD FOREIGN KEY (dog) REFERENCES Dog(collarid);
ALTER TABLE DogEvents ADD FOREIGN KEY (event) REFERENCES Events(code);
ALTER TABLE Events ADD FOREIGN KEY(dogid) REFERENCES Dog(collarid);
ALTER TABLE Events ADD FOREIGN KEY (type) REFERENCES Disease(icdcode);
ALTER TABLE Events ADD FOREIGN KEY (userid) REFERENCES Users(userid);

INSERT INTO Breed (name, origin) VALUES ('Akita', 'Japan'), ('Rottweiler', 'Germany'), ('Bolognese', 'Italy');
INSERT INTO Users (username, password, firstname, lastname, phone, email) VALUES ('agoneri', 'agoneri', 'Agostino', 'Neri', '+3933333333', 'agostino.neri@email.org');
INSERT INTO Veterinary (name, lastname, city) VALUES ('John', 'Smith', 'Split'), ('Mark', 'Rossi', 'Prague');
INSERT INTO Disease (icdcode, name) VALUES (1, 'Rabies'), (2, 'Typhus fever'), (3, 'Other');
INSERT INTO Dog (collarid, age, name, gender, own, breedid, date_birth, src) VALUES (123, 1, 'Ariel', 'F', 1, 2, '1980-01-01', NULL);
INSERT INTO Dog (collarid, age, name, gender, own, breedid, date_birth, src) VALUES (124, 1, 'Pippo', 'M', 1, 3, '1980-01-01', NULL);

/* To test calendar part */
INSERT INTO Events (note, type, userid, dogid, detailtimestamp_start, detailtimestamp_end, place) VALUES ('Dr.Strange, bring with a new collar', 1, 1, 1, '2017-07-18 22:01:34', '2017-07-18 22:01:34', 'Wall Street')

