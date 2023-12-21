const jwt = require('jsonwebtoken');
const connection = require('../config');
const secretKey = 'SECRET-KEY';

const verifyToken = (req, res, next) => {
   const token = req.headers.authorization;
   if (!token) {
      return res.status(401).json({
         error: 'Unauthorized'
      });
   }

   jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
         return res.status(401).json({
            error: 'Invalid token'
         });
      }
      req.decoded = decoded;
      next();
   });
};



const customerLogin = (req, res) => {
   const {
      username,
      password
   } = req.body;

   connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err) {
         console.error('Error executing login query:', err);
         res.status(500).json({
            error: 'Internal Server Error'
         });
      } else if (results.length === 0) {
         res.status(401).json({
            error: 'Invalid credentials'
         });
      } else {
         const user = results[0];
         const token = jwt.sign({
            userId: user.id,
            role: 'customer'
         }, secretKey, {
            expiresIn: '1h'
         });
         res.json({
            token
         });
      }
   });
}


const bankerLogin = (req, res) => {
   const {
      username,
      password
   } = req.body;

   connection.query('SELECT * FROM bankers WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err) {
         console.error('Error executing banker login query:', err);
         res.status(500).json({
            error: 'Internal Server Error'
         });
      } else if (results.length === 0) {
         res.status(401).json({
            error: 'Invalid credentials'
         });
      } else {
         const banker = results[0];
         console.log(banker);
         const token = jwt.sign({
            userId: banker.id,
            role: 'banker'
         }, secretKey, {
            expiresIn: '1h'
         });
         res.json({
            token
         });
      }
   });
}


module.exports = {
   verifyToken,
   customerLogin,
   bankerLogin
}