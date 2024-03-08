const jwt = require('jsonwebtoken');

const auth =  async (req, res, next) => {
  const { id } = req.params;
  const { token } = req.body;
  next();
}

module.exports = auth;