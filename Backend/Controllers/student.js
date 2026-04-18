const db = require('../db');
const generatePin = require('../utils/generatePin');

// Student joins a session with PIN + name
exports.joinSession = async (req, res) => {
  try {
      const { name, pin } = req.body;

          if (!name || !pin) {
                return res.status(400).json({ message: 'Name and PIN required' });
                    }

                        // Check if session exists
                            const [sessionRows] = await db.query(
                                  'SELECT id FROM sessions WHERE pin = ? LIMIT 1',
                                        [pin]
                                            );

                                                if (sessionRows.length === 0) {
                                                      return res.status(404).json({ message: 'Session not found' });
                                                          }

                                                              const sessionId = sessionRows[0].id;

                                                                  // Insert student into session
                                                                      const [result] = await db.query(
                                                                            'INSERT INTO students (name, session_id) VALUES (?, ?)',
                                                                                  [name, sessionId]
                                                                                      );

                                                                                          return res.status(201).json({
                                                                                                message: 'Joined session successfully',
                                                                                                      studentId: result.insertId,
                                                                                                            sessionId,
                                                                                                                });
                                                                                                                  } catch (err) {
                                                                                                                      console.error('joinSession error:', err);
                                                                                                                          return res.status(500).json({ message: 'Server error' });
                                                                                                                            }
                                                                                                                            };