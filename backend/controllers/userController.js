import { pool } from '../config/db.js';
import axios from 'axios'

export const mobile_register = async (req, res) => {
  let connection;

  try {
    const { mobile, tnc } = req.body;

    if (!mobile || !tnc) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const mobileRegex = /^[6-9][0-9]{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 10-digit mobile number starting from 6-9"
      });
    }

    if (!tnc) {
      return res.status(400).json({
        success: false,
        message: "You must accept our Terms & Conditions"
      });
    }

    connection = await pool.getConnection();

    const [lead] = await connection.query(
      'SELECT id FROM cus_lead WHERE mobile = ?',
      [mobile]
    );

    const otp = Math.floor(1000 + Math.random() * 9000);

    let userId;

    if (lead.length > 0) {
      userId = lead[0].id;

      await connection.query(
        'UPDATE cus_lead SET OTP = ? WHERE id = ?',
        [otp, userId]
      );
    } else {
      const [result] = await connection.query(
        'INSERT INTO cus_lead (mobile, tnc, OTP) VALUES (?, ?, ?)',
        [mobile, tnc, otp]
      );
      userId = result.insertId;
    }

    connection.release();

    const message = `Your OTP is ${otp}. Valid for 5 minutes.`;

    // await axios.post(
    //   process.env.SMS_API_URL,
    //   {
    //     to: mobile,
    //     message
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.SMS_API_KEY}`,
    //       "Content-Type": "application/json"
    //     }
    //   }
    // );

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully to your mobile number",
      data: {
        id: userId
      }
    });

  } catch (error) {
    if (connection) connection.release();
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

