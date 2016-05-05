DROP DATABASE IF EXISTS kanbangular;

DROP USER IF EXISTS kanbangular_user;
CREATE USER kanbangular_user WITH PASSWORD 'password';

CREATE DATABASE kanbangular OWNER kanbangular_user;