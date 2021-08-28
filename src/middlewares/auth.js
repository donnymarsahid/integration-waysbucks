const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);

  if (!token) {
    res.status(401).send({ message: 'Access denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send({ message: 'invalid token' });
  }
};
