import { pool } from '../config/db.js';

// Get all users
export const getAllUsersService = async () => {
  const connection = await pool.getConnection();
  try {
    const [users] = await connection.query('SELECT * FROM users');
    return users;
  } finally {
    connection.release();
  }
};

// Get user by ID
export const getUserByIdService = async (id) => {
  const connection = await pool.getConnection();
  try {
    const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    return user[0] || null;
  } finally {
    connection.release();
  }
};

// Get user by email
export const getUserByEmailService = async (email) => {
  const connection = await pool.getConnection();
  try {
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    return user[0] || null;
  } finally {
    connection.release();
  }
};

// Create user
export const createUserService = async (userData) => {
  const { name, email, password, phone, role } = userData;
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone || null, role || 'user']
    );
    return result.insertId;
  } finally {
    connection.release();
  }
};

// Update user
export const updateUserService = async (id, userData) => {
  const { name, email, phone } = userData;
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, id]
    );
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
};

// Delete user
export const deleteUserService = async (id) => {
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } finally {
    connection.release();
  }
};
