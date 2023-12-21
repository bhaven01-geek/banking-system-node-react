const connection = require('../config');

const getUserTransactions = (req, res) => {
   const userId = req.decoded.userId;

   connection.query('SELECT * FROM accounts WHERE user_id = ?', [userId], (err, results) => {
      if (err) {
         console.error('Error fetching transactions:', err);
         res.status(500).json({
            error: 'Internal Server Error'
         });
      } else {
        connection.query('SELECT balance FROM users where id = ?' , [userId],  (err , transresults) => {
            if (err) {
                console.error('Error fetching transactions:', err);
                res.status(500).json({error: 'Internal Server Error'});
            }
            else{
                res.json({balance: transresults[0].balance, transactions: results});
            }
        })
      }
   });
};


const performDeposit = (req, res) => {
   const userId = req.decoded.userId;
   const {
      amount
   } = req.body;

   connection.query('INSERT INTO accounts (user_id, type, amount) VALUES (?, ?, ?)', [userId, 'Deposit', amount], (err) => {
      if (err) {
         res.status(500).json({
            error: 'Error depositing amount'
         });
      } else {
         // Update user's balance
         connection.query('UPDATE users SET balance = balance + ? WHERE id = ?', [amount, userId], (err) => {
            if (err) {
               console.error('Error updating user balance after deposit:', err);
               res.status(500).json({
                  error: 'Internal Server Error'
               });
            } else {
               res.json({
                  depositedAmount: amount
               });
            }
         });
      }
   });
};


const performWithdrawal = (req, res) => {
   const userId = req.decoded.userId;
   const {
      amount
   } = req.body;

   connection.query('SELECT balance FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) {
         res.status(500).json({
            error: 'Internal Server Error'
         });
      } else if (results.length === 0) {
         res.status(404).json({
            error: 'User not found'
         });
      } else {
         const userBalance = results[0].balance;
         if (userBalance < amount) {
            res.status(400).json({
               error: 'Insufficient Funds'
            });
         } else {
            // Proceed with withdrawal
            connection.query('INSERT INTO accounts (user_id, type, amount) VALUES (?, ?, ?)', [userId, 'Withdrawal', amount], (err) => {
               if (err) {
                  res.status(500).json({
                     error: 'Internal Server Error'
                  });
               } else {
                  // Update user's balance
                  connection.query('UPDATE users SET balance = balance - ? WHERE id = ?', [amount, userId], (err) => {
                     if (err) {
                        res.status(500).json({
                           error: 'Internal Server Error'
                        });
                     } else {
                        res.json({
                           withdrawnAmount: amount
                        });
                     }
                  });
               }
            });
         }
      }
   });
};


module.exports = {
   performDeposit,
   performWithdrawal,
   getUserTransactions
}