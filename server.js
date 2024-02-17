const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const inquirer = require('inquirer');

dotenv.config();

const PORT = process.env.PORT || 3306;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the company_db database.');
});

  function employeeTracker(){
    inquirer.prompt([
      {
        type: 'list',
        name: 'viewChoices',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role' ]
      }
    ]).then(answer => {
      switch (answer.viewChoices) {
        case 'View all Departments':
          console.log('Viewing Departments!');
          viewDepartments();
          break;
  
        case 'View all Roles':
          console.log('Viewing Roles!');
          viewAllRoles();
          break;
  
        case 'View all Employees':
          console.log('Viewing Employees!');
          viewAllEmployees();
          break;
  
        case 'Add a Department':
          console.log('Adding a Department!');
          addDepartment();
          break;
  
        case 'Add a Role':
          console.log('Adding a Role!');
          addRole();
          break;
  
        case 'Add an Employee':
          console.log('Adding an Employee!');
          addEmployee();
          break;
  
        case 'Update an Employee Role':
          console.log('Updating an Employee Role!');
          updateEmployeeRole();
          break;
  
        case 'End':
          console.log('Exiting application.');
          db.end();
          break;
      }
    });
  }






app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});