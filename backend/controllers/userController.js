import { pool } from '../config/db.js';

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [users] = await connection.query('SELECT * FROM users');
    connection.release();

    res.status(200).json({
      success: true,
      data: users,
      message: 'Users fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message,
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
    connection.release();

    if (user.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user[0],
      message: 'User fetched successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user',
      error: error.message,
    });
  }
};

// Create user
export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide required fields',
      });
    }

    const connection = await pool.getConnection();
    
    // Check if user already exists
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      connection.release();
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    // Insert user
    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, password, phone || null]
    );
    
    connection.release();

    res.status(201).json({
      success: true,
      data: { id: result.insertId, name, email, phone },
      message: 'User created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message,
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const connection = await pool.getConnection();
    
    // Check if user exists
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (existingUser.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update user
    await connection.query(
      'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name || existingUser[0].name, email || existingUser[0].email, phone || existingUser[0].phone, id]
    );

    connection.release();

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error.message,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();
    
    // Check if user exists
    const [existingUser] = await connection.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );

    if (existingUser.length === 0) {
      connection.release();
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Delete user
    await connection.query('DELETE FROM users WHERE id = ?', [id]);
    connection.release();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

export const mobile_register = async (req,res) => {
  try {
    const {mobile, tnc} = req.body;

    const connection = await pool.getConnection();
    const [lead] = await connection.query(
      'SELECT * FROM cus_lead WHERE mobile = ?',
      [mobile]
    );

    if(lead.length !== 0){
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    if(mobile.length === 0){
      return res.status(400).json({
        success: false,
        message: "Mobile number is required"
      });
    }

    const mobileRegex = /^[0-9]+$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must contain only digits"
      });
    }

    if(mobile.length < 10 || mobile.length > 10){
      return res.status(400).json({
        success: false,
        message: "Mobile number must be of 10-digits"
      });
    }

    if(!tnc){
      return res.status(400).json({
        success: false,
        message: "You must accept our Terms & Conditions"
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(`OTP for ${mobile}: ${otp}`);

    const [result] = await connection.query(
      'INSERT INTO cus_lead (`mobile`, `tnc`, `OTP`) VALUES (?, ?, ?)',
      [mobile, tnc, otp]
    );

    connection.release();

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${mobile} mobile number`,
      data:{
        id: result.insertId,
      }
    });
  } catch (error) {
    if(error){
      console.log(error);
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}
