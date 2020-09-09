//  Look at the departments table in the school database provided to you. How many columns does it have and what are the column names?
// .schema departments ->
// two columns (id and name)

//* By including PRIMARY KEY in the definition of a column, you tell the RDBMS that for each row, the value of this column should be uniquely identifying. RDBMSs will enforce the uniqueness of primary keys. If you should try to modify the database in a way that violates the uniqueness of a primary key, you will get an error.
//  Which column in the departments table is intended to be uniquely identifying?
// the id -> PRIMARY KEY

//* when PRIMARY KEY used in other tables -> FOREIGN KEY
// Look at the teachers schema. Which column is being used as a foreign key? Why might we be using a foreign key here rather than storing the data directly in this table? Review the last paragraph if you are unclear.
// for department column, it says FOREIGN KEY(department)

// Look at the remaining table schemas in this database. Whiteboard each of the 5 tables, representing them as simple spreadsheet like grids, using arrows to indicate where a particular column is referring to data stored in another table.
// b (used SELECT * FROM <table-name>;)

// .mode column, .header on
// Display the name column for every row in the students table
//SELECT name FROM students;

//  Display every column for the teachers table. The department column just contains numbers, what are these numbers referencing? (Look at the teachers schema if you need to).
// SELECT * FROM teachers;

//  Display every column for the teachers table and then every column for the departments table. Just by looking at the tables, what is the name of the department that the teacher beth is a part of?
// SELECT * FROM teachers;
// SELECT * FROM departments;
// beth is part of department 1: cs

// SELECT <column-name> FROM <table-name>
  // WHERE <some-condition-to-limit-by>;
  // ^can use  =, !=, <, >, <=, and >=, AND and OR

// SELECT * FROM teachers
// WHERE department = 1 OR department = 2;

//Display just the name column for all the students whose names are not naomi. (Note, naomi being text, should be placed in single quotes)
// SELECT name FROM students
// ...> WHERE name != 'naomi';

//  Display the name and department id of teachers whose own id is greater than 2 or whose name is 'fred'
// SELECT name, department FROM teachers
// ...> WHERE id > 2 OR name = 'fred';

// Aside from the comparison operators above, you can also use the LIKE keyword, in conjunction with the % wildcard symbol to select rows based on patterns you write. % will match 0 or more of any character. Using NOT LIKE instead of LIKE will select rows that do not match the pattern.
// For example, to select all the class names that start with the letter 'c':
// SELECT name FROM CLASSES
//   WHERE name LIKE 'c%';
// Display the id and name of all the students whose names end in 'm'
// SELECT id, name FROM students
// ...> WHERE name LIKE '%m';

//  Display all columns for students whose names do not contain the letter 'a'. HINT: a more long-winded way to say "includes the letter 'a'" is "includes 0 or more of any letter followed by an 'a' followed by 0 or more of any letter."
// SELECT * FROM students
// ...> WHERE name NOT LIKE '%a%';

// Using IN you can filter your query against a set of matches you define, for example, to get the entries for the teachers whose names are either 'pamela' or 'sunny':
//SELECT * FROM teachers
// WHERE name IN ('pamela', 'sunny');
// same as:
//SELECT * FROM teachers
// WHERE name = 'pamela' OR name = 'sunny';

// Display just the names of all the teachers whose id is NOT either 1, 2, or 4
// SELECT name FROM teachers
// ...> WHERE id NOT IN ('1', '2', '4');

// Display just the names of all the teachers whose department is either 1 or 4
// SELECT name FROM teachers
// ...> WHERE department IN ('1', '4');

//"who are all the teachers in the 'cs' department", instead of "all the teachers in the department with an id of 1". In order to do this, you would first need to find out what the id field is for the department with the name 'cs', and then, with that id, ask for any of the teachers whose department foreign key equals the id you just retrieved.
// SELECT id FROM departments
//   WHERE name = 'cs';
// And then with our result, 1, issue a second query:
// SELECT name FROM teachers
//   WHERE department = 1;
// SELECT name FROM teachers
  // WHERE department IN (SELECT id FROM departments
    // WHERE name = 'cs');
// Display the name and id of all the teachers in the 'psy' department (should be pamela and sunny, with their respective ids)
// SELECT name, id FROM teachers
// ...> WHERE department IN (SELECT id FROM departments
//   ...> WHERE name = 'psy');

// Display the name of the department that 'sunny' teaches for (should be 'psy')
//  SELECT name FROM departments
// ...> WHERE id IN (SELECT department FROM teachers
  // ...> WHERE name = 'sunny');

// You can select from multiple tables in SQL with the following syntax : SELECT * FROM <table-1>, <table-2> [,<table-n>];.
// SELECT * FROM departments, classes;

// for each column you wish to select, you need to preface the column name with the table name. For example, SELECT departments.id, classes.id FROM departments, classes;.
//  Use the same thought process from above to make a prediction about what the following queries will return. How many columns will there be? How many rows will there be? Run each of the queries to check your work.
//  SELECT departments.id, classes.id FROM departments, classes; -> 2 columns, id and id -> 8
//  SELECT students.*, teachers.name FROM students, teachers; -> 3 columns -> 24 rows

// only select the names of teachers from the cs department
// SELECT teachers.name FROM teachers, departments
  // WHERE departments.name = "cs" AND teachers.department = departments.id;

// do the following without subqueries, using multiple table selection
  // Display the name and id of all the teachers in the 'psy' department (should be pamela and sunny, with their respective ids)
  // SELECT teachers.name, teachers.id FROM teachers, departments
  //  ...> WHERE departments.name = 'psy' AND teachers.department = departments.id;

  // Display the name of the department that 'sunny' teaches for (should be 'psy')
  // SELECT departments.name FROM teachers, departments
  //  ...> WHERE teachers.name = 'sunny' AND departments.id = teachers.department;

//Selecting accross multiple tables and then filtering based on the rows that have shared entries is known as an inner join. The following query, which is already familiar to you, is an inner join:
// SELECT teachers.name FROM teachers, departments
// WHERE teachers.department = departments.id;
// ===
// SELECT teachers.name FROM teachers INNER JOIN departments
// ON teachers.department = departments.id;

//What is the difference between the return from the following two statements:
// SELECT * FROM students, teachers;
// SELECT * FROM students INNER JOIN teachers;
// no difference?

// Using inner join syntax
// Display the name and id of all the teachers in the 'psy' department (should be pamela and sunny, with their respective ids)
// SELECT teachers.name, teachers.id FROM teachers INNER JOIN departments
// ...> ON departments.name ='psy' AND teachers.department = departments.id;

//  Display the name of the department that 'sunny' teaches for (should be 'psy')
// SELECT departments.name FROM departments INNER JOIN teachers
// ...> ON teachers.name = 'sunny' AND teachers.department = departments.id;

// The next most common kind of join is the left outer join (there are also right outer joins). The left outer join will return all the same information as an inner join, but will also return all entries from the first table in the query, even the ones that don't meet the ON condition.

//Consider the relationship of students to classes. We would expect there to be many students in each class and also many classes for each student. This kind of relationship is called many to many. There is not a very direct way to handle many to many relationships between tables. Instead, when we want to support a many to many relationship between two tables, we create a third table, often referred to as a join table (or sometime junction table) that contains foreign keys referencing each of the other 2 tables.

//classes_students is an example of a join table btwn classes and students

//Take a look at the classes_students schema and answer the following:
//  Which classes is 'sam' taking? (confirm your answer below) -> 'communication'
// SELECT classes.name FROM classes_students, students, classes
// ...> WHERE students.name = 'sam' AND students.id = classes_students.student_id AND classes.id = classes_students.classes_id;

//  What are the names of the students in the 'compromise' class?
// SELECT students.name FROM classes_students, students, classes
// ...> WHERE classes.name = 'compromise' AND classes.id = classes_students.classes_id AND students.id = classes_students.student_id;

//  What are the names of the students taking any class in the 'cs' department? 'lauren, dan, naomi, kim, chris'
// SELECT students.name FROM departments, students, classes, classes_students
// ...> WHERE departments.name = 'cs' AND departments.id = classes.department AND classes_students.student_id = students.id AND classes_students.classes_id = classes.id;







