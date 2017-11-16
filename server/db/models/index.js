const Student = require('./students')
const Cohort = require('./cohorts')
const Instructor = require('./instructors');
const Course = require('./courses');

// Put associations here
Student.belongsToMany(Instructor, { through: 'instructors_students' });
Instructor.belongsToMany(Student, { through: 'instructors_students' });

Student.belongsTo(Cohort);
Cohort.hasMany(Student);

Student.belongsToMany(Course, { through: 'students_courses' });
Course.belongsToMany(Student, { through: 'students_courses' });

Instructor.belongsToMany(Cohort, { through: 'instructors_cohorts' });
Cohort.belongsToMany(Instructor, { through: 'instructors_cohorts' });

Instructor.belongsToMany(Course, { through: 'instructors_courses' });
Course.belongsToMany(Instructor, { through: 'instructors_courses' });

Cohort.belongsToMany(Course,  { through: 'cohorts_courses' });
Course.belongsToMany(Cohort,  { through: 'cohorts_courses' });

module.exports = {
  Student,
  Cohort,
  Instructor,
  Course
}
