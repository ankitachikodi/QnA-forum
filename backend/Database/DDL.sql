DROP DATABASE quora;

CREATE DATABASE quora;
USE quora;

DROP TABLE IF EXISTS
	quora.User;
CREATE TABLE quora.User(
    ID int PRIMARY KEY AUTO_INCREMENT,
    password varchar
(128) NOT NULL,
    extra varchar
(10) NOT NULL,
    username varchar
(25) NOT NULL,
    email varchar
(50) NOT NULL
);

INSERT INTO User
VALUES
    (013772395, 'test', 'extra', 'username', 'test@abc.xyz')
