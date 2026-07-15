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

-- ============================================
-- SESSION 3: Aggregations + JOINs
-- ============================================

-- Aggregate functions
SELECT COUNT(*) FROM students;
SELECT AVG(age) FROM students;

-- Related tables for JOIN practice
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_name VARCHAR(100)
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    course_id INT REFERENCES courses(id)
);

-- Example INNER JOIN across 3 tables
SELECT students.name, courses.course_name
FROM enrollments
INNER JOIN students ON enrollments.student_id = students.id
INNER JOIN courses ON enrollments.course_id = courses.id;

-- (More Session 3 queries — GROUP BY, HAVING, LEFT/RIGHT/FULL JOIN — to be added below as practiced)
