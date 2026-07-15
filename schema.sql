-- ============================================
-- Database Practice: canteen_practice
-- PostgreSQL learning log — Session 1, 2, 3
-- ============================================

-- ============================================
-- SESSION 1: Foundations + Setup
-- ============================================

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    age INT
);

INSERT INTO students (name, age) VALUES ('Kumar', 22);
INSERT INTO students (name, age) VALUES ('Anish', 22);
INSERT INTO students (name, age) VALUES ('Jaidev', 21);

-- ============================================
-- SESSION 2: Querying (WHERE, ORDER BY, LIMIT, UPDATE, DELETE)
-- ============================================

-- Filter rows
SELECT * FROM students WHERE age = 22;

-- Pattern matching (case-insensitive) + sorting
SELECT * FROM students WHERE name ILIKE '%a%' ORDER BY age DESC;

-- Update a row
UPDATE students SET age = 25 WHERE name = 'Anish';

-- Insert more students
INSERT INTO students (name, age) VALUES ('Ranveer', 24);
INSERT INTO students (name, age) VALUES ('Shivam', 21);
INSERT INTO students (name, age) VALUES ('Santosh', 22);

-- Delete rows below a threshold (careful — always use WHERE!)
DELETE FROM students WHERE age < 22;

-- Confirm final state
SELECT * FROM students ORDER BY age DESC;

