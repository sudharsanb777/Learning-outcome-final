// Initial mock data to populate localStorage if none exists
export const initialData = {
  users: [
    { id: 1, name: 'Admin User', email: 'admin@uni.edu', role: 'admin', status: 'Active' },
    { id: 2, name: 'Dr. Jane Smith', email: 'faculty@uni.edu', role: 'faculty', status: 'Active', department: 'Computer Science' },
    { id: 3, name: 'Dr. Robert Brown', email: 'robert@uni.edu', role: 'faculty', status: 'Active', department: 'Software Engineering' },
    { id: 4, name: 'Alice Williams', email: 'student@uni.edu', role: 'student', status: 'Active', enrollmentYear: 2023, major: 'CS' },
    { id: 5, name: 'Bob Johnson', email: 'bob@uni.edu', role: 'student', status: 'Active', enrollmentYear: 2023, major: 'CS' },
  ],
  plos: [
    { id: 1, code: 'PLO1', description: 'Engineering Knowledge: Apply knowledge of mathematics, science, engineering fundamentals.', status: 'Active' },
    { id: 2, code: 'PLO2', description: 'Problem Analysis: Identify, formulate, review research literature, and analyze complex engineering problems.', status: 'Active' },
    { id: 3, code: 'PLO3', description: 'Design/Development of Solutions: Design solutions for complex engineering problems.', status: 'Active' },
  ],
  courses: [
    { id: 1, code: 'CS101', title: 'Introduction to Programming', credits: 3, facultyId: 2, semester: 'Fall 2023' },
    { id: 2, code: 'CS201', title: 'Data Structures and Algorithms', credits: 4, facultyId: 3, semester: 'Spring 2024' },
  ],
  clos: [
    { id: 1, courseId: 1, code: 'CLO1', description: 'Understand basic programming constructs.', bloomLevel: 'Understand' },
    { id: 2, courseId: 1, code: 'CLO2', description: 'Write simple programs using functions and loops.', bloomLevel: 'Apply' },
    { id: 3, courseId: 2, code: 'CLO1', description: 'Analyze the time and space complexity of algorithms.', bloomLevel: 'Analyze' },
  ],
  mappings: [ // Mapping of CLO id to PLO ids, with correlation level (1-Low, 2-Medium, 3-High)
    { id: 1, cloId: 1, ploId: 1, level: 3 },
    { id: 2, cloId: 2, ploId: 2, level: 2 },
    { id: 3, cloId: 3, ploId: 2, level: 3 },
  ],
  enrollments: [
    { id: 1, studentId: 4, courseId: 1, semester: 'Fall 2023' },
    { id: 2, studentId: 5, courseId: 1, semester: 'Fall 2023' },
    { id: 3, studentId: 4, courseId: 2, semester: 'Spring 2024' },
  ],
  assessments: [
    // marks out of 100 for a specific CLO
    { id: 1, studentId: 4, courseId: 1, cloId: 1, score: 85, type: 'Midterm' },
    { id: 2, studentId: 4, courseId: 1, cloId: 2, score: 90, type: 'Final' },
    { id: 3, studentId: 5, courseId: 1, cloId: 1, score: 70, type: 'Midterm' },
  ]
};
