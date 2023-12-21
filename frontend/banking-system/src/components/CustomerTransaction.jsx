// CustomerTransactions.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const apiUrl = "http://localhost:5000/banker";

const CustomerTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");
  const { id } = useParams();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${apiUrl}/transactions/${id}`, {
          headers: { Authorization: token },
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error(
          "Failed to fetch transactions:",
          error.response.data.error,
        );
      }
    };

    fetchTransactions();
  }, [token, id]);

  return (
    <div className="transaction-container">
      <h1>Transaction History</h1>
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

export default CustomerTransactions;
