const connection = require('../config');

const getAllTransactions = (req, res) => {
   // Verify that the user is a banker
   console.log(req.decoded);
   const {
      role
   } = req.decoded;
   if (role !== 'banker') {
      return res.status(403).json({
         error: 'Forbidden'
      });
   }

   connection.query('SELECT id, username, balance FROM users', (err, results) => {
      if (err) {
         console.error('Error fetching customer accounts:', err);
         res.status(500).json({
            error: 'Internal Server Error'
         });
      } else {
         res.json({
            accounts: results
         });
      }
   });
};



const getSpecTransaction = (req, res) => {
   const userId = req.params.id;

   connection.query('SELECT * FROM accounts WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
         console.error('Error fetching transactions:', err);
         res.status(500).json({
            error: 'Internal Server Error'
         });
      } else {
         res.json({
            transactions: results
         });
      }
   });
};



module.exports = {
   getAllTransactions,
   getSpecTransaction,
}