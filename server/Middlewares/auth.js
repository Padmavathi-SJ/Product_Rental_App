import jwt from 'jsonwebtoken';

// Protect route middleware
export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Attach the decoded user ID to the request
    next(); // Allow the request to proceed
  } catch (err) {
    return res.status(403).json({ msg: 'Invalid or expired token' });
  }
};
