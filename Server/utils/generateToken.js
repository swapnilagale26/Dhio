const jwt = require('jsonwebtoken');

const setCookies = (res, userId) => {
  const token = jwt.sign(
    { userId: userId}, 
    process.env.JWTSecret, 
    { expiresIn: '30d'},
  );
  
  res.cookie('jwt', token, { 
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 Days
  })
}

const generateToken = (userId) => {
  return jwt.sign(
    { userId: userId}, 
    process.env.JWTSecret, 
    { expiresIn: '30d'},
  );
}

module.exports =  {generateToken, setCookies};
