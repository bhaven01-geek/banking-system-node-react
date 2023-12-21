import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:5000/customer";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/transactions`, {
          headers: { Authorization: token },
        });
        // console.log(response.data);
        setTotalBalance(response.data.balance)
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error(
          "Failed to fetch transactions:",
          error.response.data.error,
        );
      }
    };

    fetchTransactions();
  }, [token]);

  return (
    <div className="transaction-container">
      <div className="balance-container">
        <p>Total Balance: Rs. {totalBalance}</p>
      </div>
      <h1>Transaction History</h1>
      <Link to="/deposit-withdrawal" className="link-button">
        Deposit/Withdraw
      </Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className={transaction.type.toLowerCase()}>
              <td>{transaction.id}</td>
              <td>{transaction.type}</td>
              <td>Rs. {transaction.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
