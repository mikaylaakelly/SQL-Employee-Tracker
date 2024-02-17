const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const inquirer = require('inquirer');

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3001,
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

  function viewDepartments() {
    const query = `SELECT 
    department_id AS ID, 
    department_name AS Department FROM department`;

    db.query(query, (err, data) => {
      if (err) {
          console.error("Error: ViewDepartments", err);
          return;
      }
      console.table(data);
      checkStatus();
  });
}

function viewAllRoles() {
  const query = `SELECT
    roles.role_id AS ID,
    roles.title AS Title,
    roles.salary AS Salary,
    department.department_name AS Department
      FROM
      roles
      JOIN
      department ON roles.department_id = department.id
      ORDER BY
      roles.role_id ASC`;
  db.query(query, (err, data) => {
      if (err) {
          console.error("Error: ViewAllRoles", err);
          return;
      }
      console.table(data);
      checkStatus();
  });
}

function viewAllEmployees() {
const query = `SELECT 
  employee.emp_id AS ID, 
  employee.first_name AS First_Name, 
  employee.last_name AS Last_Name, 
  roles.title AS Title, 
  roles.salary AS Salary, 
  CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
  FROM employee
  LEFT JOIN 
  roles ON employee.roles_id = roles.role_id
  LEFT JOIN 
  employee AS manager ON employee.manager_id = manager.emp_id`;
  db.query(query, (err, data) => {
      if (err) {
          console.error("Error: viewALLEmployees", err);
          return;
      }
      console.table(data);
      checkStatus();
  });
}



app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});


const departmentQuery = `INSERT INTO department (department_name) VALUES (?)`;

function addDepartment() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:'
      }
  ]).then(answer => {
      const values = [answer.departmentName];
      db.query(departmentQuery, values, (err, result) => {
          if (err) throw err;
          console.log(`${result.affectedRows} Department was added successfully!`);
          checkStatus();
      });
  });
}

const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;

function addRole() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'role',
          message: 'Enter the title of the role:'
      },
      {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:'
      },
      {
          type: 'input',
          name: 'department_Id',
          message: 'Enter the department ID for the role:'
      }
  ]).then(answer => {
      const values = [answer.title, answer.salary, answer.departmentId];
      db.query(roleQuery, values, (err, result) => {
          if (err) throw err;
          console.log(`${result.affectedRows} Role was added successfully!`);
          checkStatus();
      });
  });
}

const employeeQuery = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)`;


function addEmployee() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'first_Name',
          message: 'Enter the first name of the employee:'
      },
      {
          type: 'input',
          name: 'last_Name',
          message: 'Enter the last name of the employee:'
      },
      {
          type: 'input',
          name: 'role_Id',
          message: 'Enter the role ID for the employee:'
      },
      {
          type: 'input',
          name: 'manager_Id',
          message: 'Enter the manager ID for the employee:'
      }
  ]).then(answer => {
      const values = [answer.firstName, answer.lastName, answer.roleId, answer.managerId];
      db.query(employeeQuery, values, (err, result) => {
          if (err) throw err;
          console.log(`${result.affectedRows} Employee was added successfully!`);
          checkStatus();
      });
  });
}



const updateEmployeeRoleQuery = `UPDATE employee SET roles_id = ? WHERE emp_id = ?`;


function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_Id',
            message: 'Enter the ID of the employee whose role you want to update:'
        },
        {
            type: 'input',
            name: 'new_RoleId',
            message: 'Enter the new role ID for the employee:'
        }
    ]).then(answer => {
        const values = [answer.newRoleId, answer.employeeId];
        db.query(updateEmployeeRoleQuery, values, (err, result) => {
            if (err) throw err;
            console.log(`${result.affectedRows} Employee Role was updated successfully!`);
            checkStatus();
        });
    });
}


function checkStatus() {
  inquirer.prompt([
      {
          type: 'confirm',
          name: 'next',
          message: 'Do you want to perform another action?',
          default: true
      }
  ]).then(answer => {
      if (answer.next) {
          employeeTracker();
      } else {
          console.log('Exiting application.');
          db.end();
      }
  });
}