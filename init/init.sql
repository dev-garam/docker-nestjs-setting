CREATE DATABASE IF NOT EXISTS nestDB;
CREATE USER IF NOT EXISTS 'dev-garam' IDENTIFIED BY 'nestDB';
GRANT ALL ON `database`.* TO 'dev-garam'@'%';