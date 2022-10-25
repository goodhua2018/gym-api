CREATE DATABASE gym_db;
\c gym_db

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  user_name TEXT,
  email TEXT,
  password_digest TEXT
);