CREATE DATABASE pern_fitness;

CREATE TABLE food_log(
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    calories SMALLINT,
    carbs SMALLINT,
    protein SMALLINT,
    fat SMALLINT
)

CREATE TABLE exercise_log(
    exercise_id SERIAL PRIMARY KEY,
    date DATE,
    calories SMALLINT,
    muscle VARCHAR(255),
)