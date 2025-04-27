import bcrypt from 'bcryptjs';
import { findOwnerByEmail, insertOwner } from '../../Models/owner/login.js';
import { generateToken } from '../../utils/generateToken.js';


// Admin Signup Controller
export const ownerSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await findOwnerByEmail(email);
    if (existing.length > 0) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Always hash

    const result = await insertOwner({ name, email, password: hashedPassword });

    const newAdminId = result.insertId;

    const token = generateToken(newAdminId); // ✅ generate JWT

    res.status(201).json({
      msg: 'Admin registered successfully',
      token,
      admin: {
        id: newAdminId,
        name,
        email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};


// Admin Login Controller
export const ownerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const result = await findOwnerByEmail(email);
    if (result.length === 0) {
      return res.status(401).json({ msg: 'Admin not found' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, result[0].password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid password' });

    // Generate a JWT token
    const token = generateToken(result[0].id);

    // Respond with the token and admin info
    res.status(200).json({
      msg: 'Login successful',
      token,
      admin: {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ1NTg3MDAzLCJleHAiOjE3NDU2NzM0MDN9.cT4vJRiklqemnHIlZjqQ2w6bJ6J3og4xF_tEakwxsqw
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzQ1NTg3MDAzLCJleHAiOjE3NDU2NzM0MDN9.cT4vJRiklqemnHIlZjqQ2w6bJ6J3og4xF_tEakwxsqw