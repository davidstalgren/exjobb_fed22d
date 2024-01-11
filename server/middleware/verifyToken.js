const jwt = require('jsonwebtoken');

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if(!token) {
      res.status(403).send('Not authorized')
    } else if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
    
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: 'Something went wrong' });
  }
}