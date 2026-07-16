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
-- Insert enrollment data (Kumar takes both courses, Anish takes DSA, Ranveer takes none)
INSERT INTO enrollments (student_id, course_id) VALUES (1, 1);
INSERT INTO enrollments (student_id, course_id) VALUES (2, 1);
INSERT INTO enrollments (student_id, course_id) VALUES (1, 2);

-- Challenge 1: INNER JOIN — only shows enrolled students, excludes Ranveer
SELECT students.name, courses.course_name
FROM enrollments
INNER JOIN students ON enrollments.student_id = students.id
INNER JOIN courses ON enrollments.course_id = courses.id;

-- Challenge 2: LEFT JOIN — includes every student, Ranveer shows NULL for enrollment columns
SELECT *
FROM students
LEFT JOIN enrollments ON students.id = enrollments.student_id;

-- Challenge 3: GROUP BY + COUNT — number of students enrolled per course_id
SELECT course_id, COUNT(*) FROM enrollments GROUP BY course_id;

-- Mega Challenge: JOIN + GROUP BY together — course name with enrollment count
SELECT courses.course_name, COUNT(*)
FROM enrollments
INNER JOIN courses ON enrollments.course_id = courses.id
GROUP BY courses.course_name;

-- Key takeaway: enrollments is a bridge/junction table connecting students <-> courses
-- in a many-to-many relationship. Neither students nor courses can hold a foreign key
-- to the other directly, since one student can take many courses and vice versa.