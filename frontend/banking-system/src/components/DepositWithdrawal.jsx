// DepositWithdrawal.js
import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/customer';

const DepositWithdrawal = () => {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [message, setMessage] = useState('');

  const handleTransaction = async (type) => {

    const token = localStorage.getItem('token');
    
    try {
      await axios.post(
        `${apiUrl}/${transactionType}`,
        {
          type: transactionType,
          amount: parseFloat(amount),
        },
        {
          headers: { Authorization: token },
        }
      );

      setMessage(`${transactionType.charAt(0).toUpperCase() + transactionType.slice(1)} successful!`);
    } catch (error) {
      console.error('Transaction failed:', error.response.data.error);
      setMessage(`Transaction failed: ${error.response.data.error}`);
    }
    
  };

  return (
    <div className="deposit-withdrawal-container">
      <h1>Deposit / Withdrawal</h1>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="transactionType">Transaction Type:</label>
        <select
          id="transactionType"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
        </select>
      </div>
      <button className="submit-btn" onClick={handleTransaction}>
        Submit
      </button>
      {message && <p className="message-box">{message}</p>}
    </div>
  );
};

export default DepositWithdrawal;
