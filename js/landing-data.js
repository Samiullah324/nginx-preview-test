/**
 * Dummy data for the Student Management System landing page (NGIN-0014).
 * Replace with live API responses when backend endpoints are available.
 */
window.LANDING_DATA = {
  app: {
    name: 'Student Management System',
    tagline: 'Streamline enrollment, grades, and attendance in one place.',
    badge: 'Preview environment active',
    buildTag: '__BUILD_TAG__',
  },

  stats: [
    { label: 'Active students', value: '1,248', trend: '+12% this term' },
    { label: 'Courses offered', value: '48', trend: '6 new this semester' },
    { label: 'Faculty members', value: '86', trend: 'Across 4 departments' },
    { label: 'Avg. attendance', value: '94%', trend: 'Last 30 days' },
  ],

  features: [
    {
      icon: '📋',
      title: 'Student records',
      description: 'Centralised profiles with contact details, guardians, and enrollment history.',
    },
    {
      icon: '📚',
      title: 'Course management',
      description: 'Create timetables, assign instructors, and track capacity across departments.',
    },
    {
      icon: '✅',
      title: 'Attendance tracking',
      description: 'Mark daily attendance and generate reports for parents and administrators.',
    },
    {
      icon: '📊',
      title: 'Grades & reporting',
      description: 'Record assessments, publish report cards, and export term summaries.',
    },
  ],

  recentEnrollments: [
    { student: 'Aisha Khan', course: 'Mathematics 101', date: 'May 22, 2026', status: 'Enrolled' },
    { student: 'James O\'Connor', course: 'English Literature', date: 'May 21, 2026', status: 'Enrolled' },
    { student: 'Sofia Martinez', course: 'Biology Lab', date: 'May 20, 2026', status: 'Pending' },
    { student: 'Ethan Wong', course: 'Computer Science', date: 'May 19, 2026', status: 'Enrolled' },
    { student: 'Priya Sharma', course: 'World History', date: 'May 18, 2026', status: 'Enrolled' },
  ],

  announcements: [
    {
      title: 'Summer term registration opens',
      date: 'May 20, 2026',
      body: 'Registration for summer courses begins Monday. Early enrollment closes May 30.',
    },
    {
      title: 'Parent-teacher conferences',
      date: 'May 15, 2026',
      body: 'Schedule slots are now available for the June conference week.',
    },
    {
      title: 'New attendance policy',
      date: 'May 10, 2026',
      body: 'Updated guidelines for excused absences take effect next term.',
    },
  ],

  testimonials: [
    {
      quote: 'We cut enrollment paperwork in half. Teachers finally have one place for grades and attendance.',
      author: 'Dr. Helen Brooks',
      role: 'Principal, Westfield Academy',
    },
    {
      quote: 'Parents love the visibility into schedules and report cards. Setup took less than a day.',
      author: 'Marcus Lee',
      role: 'IT Director, Riverside School District',
    },
  ],
};
