-- Use the default TiDB serverless database
USE test;

-- Drop existing tables to start fresh (useful for seeding)
DROP TABLE IF EXISTS assessments;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS mappings;
DROP TABLE IF EXISTS clos;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS plos;
DROP TABLE IF EXISTS users;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'student') NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    department VARCHAR(255),
    enrollmentYear INT,
    major VARCHAR(255)
);

-- PLOs Table
CREATE TABLE plos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

-- Courses Table
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    credits INT NOT NULL,
    semester VARCHAR(100) NOT NULL,
    facultyId INT,
    FOREIGN KEY (facultyId) REFERENCES users(id) ON DELETE SET NULL
);

-- CLOs Table
CREATE TABLE clos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    courseId INT NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    bloomLevel ENUM('Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create') NOT NULL,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_clo_course (courseId, code)
);

-- CLO to PLO Mappings Table
CREATE TABLE mappings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cloId INT NOT NULL,
    ploId INT NOT NULL,
    level INT NOT NULL CHECK (level BETWEEN 1 AND 3),
    FOREIGN KEY (cloId) REFERENCES clos(id) ON DELETE CASCADE,
    FOREIGN KEY (ploId) REFERENCES plos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_mapping (cloId, ploId)
);

-- Student Enrollments Table
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    courseId INT NOT NULL,
    semester VARCHAR(100) NOT NULL,
    FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (studentId, courseId)
);

-- Student Assessments Table
CREATE TABLE assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentId INT NOT NULL,
    courseId INT NOT NULL,
    cloId INT NOT NULL,
    score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
    type VARCHAR(100) NOT NULL,
    FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (cloId) REFERENCES clos(id) ON DELETE CASCADE,
    UNIQUE KEY unique_assessment (studentId, courseId, cloId, type)
);
