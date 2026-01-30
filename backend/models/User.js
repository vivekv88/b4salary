// User Model
// This file contains database schema documentation for the users table

/*
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role ENUM('user', 'admin') DEFAULT 'user',
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
*/

export const userSchema = {
  id: 'INT AUTO_INCREMENT PRIMARY KEY',
  name: 'VARCHAR(255) NOT NULL',
  email: 'VARCHAR(255) UNIQUE NOT NULL',
  password: 'VARCHAR(255) NOT NULL',
  phone: 'VARCHAR(20)',
  role: "ENUM('user', 'admin') DEFAULT 'user'",
  isActive: 'BOOLEAN DEFAULT true',
  createdAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
  updatedAt: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
};
