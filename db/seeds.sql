INSERT INTO department (department_name)
VALUES
('Design'),
('Sales'),
('Production'),
('Publicity'),
('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES
('Graphic Designer', 55000, 1),
('Design Coordinator', 80000, 1),
('Sales Associate', 55000, 2),
('Sales Manager', 80000,  2),
('Production Assistant', 50000, 3),
('Production Supervisor', 65000, 3),
('Publicist', 60000, 4),
('Media Relations Manager', 69000, 4),
('Customer Service Rep', 45000, 5),
('HR Manager', 65000, 5);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES 
('Darryl', 'Philbin', 1, 3),
('BJ', 'Novak', 1, 3),
('Jan', 'Levinson', 2, null),
('Jim', 'Halpert', 3, 6),
('Dwight', 'Schrute', 3, 6),
('Michael', 'Scott', 4, null),
('Creed', 'Bratton', 5, 8),
('Meredith', 'Palmer', 6, null),
('Oscar', 'Martinez', 7, 10),
('Angela', 'Martin', 8, null),
('Kelly', 'Kapoor', 9, 12),
('Toby', 'Flenderson', 10, null);