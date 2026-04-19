-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'faculty', 'student')),
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    department VARCHAR(255),
    "enrollmentYear" INT,
    major VARCHAR(255)
);

-- PLOs Table
CREATE TABLE plos (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive'))
);

-- Courses Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    credits INT NOT NULL,
    semester VARCHAR(100) NOT NULL,
    "facultyId" INT,
    FOREIGN KEY ("facultyId") REFERENCES users(id) ON DELETE SET NULL
);

-- CLOs Table
CREATE TABLE clos (
    id SERIAL PRIMARY KEY,
    "courseId" INT NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    "bloomLevel" VARCHAR(50) NOT NULL CHECK ("bloomLevel" IN ('Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create')),
    FOREIGN KEY ("courseId") REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE ("courseId", code)
);

-- CLO to PLO Mappings Table
CREATE TABLE mappings (
    id SERIAL PRIMARY KEY,
    "cloId" INT NOT NULL,
    "ploId" INT NOT NULL,
    level INT NOT NULL CHECK (level BETWEEN 1 AND 3),
    FOREIGN KEY ("cloId") REFERENCES clos(id) ON DELETE CASCADE,
    FOREIGN KEY ("ploId") REFERENCES plos(id) ON DELETE CASCADE,
    UNIQUE ("cloId", "ploId")
);

-- Student Enrollments Table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    "studentId" INT NOT NULL,
    "courseId" INT NOT NULL,
    semester VARCHAR(100) NOT NULL,
    FOREIGN KEY ("studentId") REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE ("studentId", "courseId")
);

-- Student Assessments Table
CREATE TABLE assessments (
    id SERIAL PRIMARY KEY,
    "studentId" INT NOT NULL,
    "courseId" INT NOT NULL,
    "cloId" INT NOT NULL,
    score INT NOT NULL CHECK (score BETWEEN 0 AND 100),
    type VARCHAR(100) NOT NULL,
    FOREIGN KEY ("studentId") REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY ("courseId") REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY ("cloId") REFERENCES clos(id) ON DELETE CASCADE,
    UNIQUE ("studentId", "courseId", "cloId", type)
);
