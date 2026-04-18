// backend/controllers/teacherController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db'); // your MySQL helper

const SALT_ROUNDS = 10;

exports.registerTeacher = async (req, res) => {
  try {
      const { name, email, password } = req.body;

          if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
                    }

                        const [existing] = await db.query(
                              'SELECT id FROM teachers WHERE email = ? LIMIT 1',
                                    [email]
                                        );

                                            if (existing.length > 0) {
                                                  return res.status(409).json({ message: 'Email already registered' });
                                                      }

                                                          const hashed = await bcrypt.hash(password, SALT_ROUNDS);

                                                              const result = await db.query(
                                                                    'INSERT INTO teachers (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
                                                                          [name, email, hashed, 'teacher']
                                                                              );

                                                                                  const teacherId = result[0].insertId;

                                                                                      const token = jwt.sign(
                                                                                            { id: teacherId, email, role: 'teacher' },
                                                                                                  process.env.JWT_SECRET,
                                                                                                        { expiresIn: '1h' }
                                                                                                            );

                                                                                                                return res.status(201).json({
                                                                                                                      message: 'Teacher registered successfully',
                                                                                                                            token,
                                                                                                                                });
                                                                                                                                  } catch (err) {
                                                                                                                                      console.error('registerTeacher error:', err);
                                                                                                                                          return res.status(500).json({ message: 'Server error' });
                                                                                                                                            }
                                                                                                                                            };

                                                                                                                                            exports.loginTeacher = async (req, res) => {
                                                                                                                                              try {
                                                                                                                                                  const { email, password } = req.body;

                                                                                                                                                      if (!email || !password) {
                                                                                                                                                            return res.status(400).json({ message: 'Email and password required' });
                                                                                                                                                                }

                                                                                                                                                                    const [rows] = await db.query(
                                                                                                                                                                          'SELECT id, name, email, password_hash, role FROM teachers WHERE email = ? LIMIT 1',
                                                                                                                                                                                [email]
                                                                                                                                                                                    );

                                                                                                                                                                                        if (rows.length === 0) {
                                                                                                                                                                                              return res.status(401).json({ message: 'Invalid credentials' });
                                                                                                                                                                                                  }

                                                                                                                                                                                                      const teacher = rows[0];

                                                                                                                                                                                                          const match = await bcrypt.compare(password, teacher.password_hash);
                                                                                                                                                                                                              if (!match) {
                                                                                                                                                                                                                    return res.status(401).json({ message: 'Invalid credentials' });
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                            const token = jwt.sign(
                                                                                                                                                                                                                                  { id: teacher.id, email: teacher.email, role: teacher.role },
                                                                                                                                                                                                                                        process.env.JWT_SECRET,
                                                                                                                                                                                                                                              { expiresIn: '1h' }
                                                                                                                                                                                                                                                  );

                                                                                                                                                                                                                                                      return res.json({
                                                                                                                                                                                                                                                            message: 'Login successful',
                                                                                                                                                                                                                                                                  token,
                                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                                        } catch (err) {
                                                                                                                                                                                                                                                                            console.error('loginTeacher error:', err);
                                                                                                                                                                                                                                                                                return res.status(500).json({ message: 'Server error' });
                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                  };