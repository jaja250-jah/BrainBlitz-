// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function auth(requiredRole = null) {
  return (req, res, next) => {
      const authHeader = req.headers.authorization;

          if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'No token provided' });
                    }

                        const token = authHeader.split(' ')[1];

                            try {
                                  const decoded = jwt.verify(token, process.env.JWT_SECRET);
                                        req.user = decoded; // { id, role, email }

                                              if (requiredRole && decoded.role !== requiredRole) {
                                                      return res.status(403).json({ message: 'Forbidden: insufficient role' });
                                                            }

                                                                  next();
                                                                      } catch (err) {
                                                                            return res.status(401).json({ message: 'Invalid or expired token' });
                                                                                }
                                                                                  };
                                                                                  };// backend/middleware/auth.js
                                                                                  const jwt = require('jsonwebtoken');

                                                                                  module.exports = function auth(requiredRole = null) {
                                                                                    return (req, res, next) => {
                                                                                        const authHeader = req.headers.authorization;

                                                                                            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                                                                                                  return res.status(401).json({ message: 'No token provided' });
                                                                                                      }

                                                                                                          const token = authHeader.split(' ')[1];

                                                                                                              try {
                                                                                                                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                                                                                                                          req.user = decoded; // { id, role, email }

                                                                                                                                if (requiredRole && decoded.role !== requiredRole) {
                                                                                                                                        return res.status(403).json({ message: 'Forbidden: insufficient role' });
                                                                                                                                              }

                                                                                                                                                    next();
                                                                                                                                                        } catch (err) {
                                                                                                                                                              return res.status(401).json({ message: 'Invalid or expired token' });
                                                                                                                                                                  }
                                                                                                                                                                    };
                                                                                                                                                                    };