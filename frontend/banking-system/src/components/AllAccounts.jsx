// AllAccounts.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiUrl = "http://localhost:5000/banker";

const AllAccounts = () => {
  const [customerAccounts, setCustomerAccounts] = useState([]);

  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/accounts`, {
          headers: { Authorization: token },
        });
        setCustomerAccounts(response.data.accounts);
      } catch (error) {
        console.error("Failed to fetch accounts:", error.response.data.error);
      }
    };

    fetchAccounts();
  }, [token]);

  return (
    <div className="accounts-container">
      <h1>Customer Accounts</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {customerAccounts.map((account) => (
            <tr key={account.id}>
              <td>
                <Link to={`/transactions/${account.id}`}>
                  <strong>{account.username}</strong>
                </Link>
              </td>
              <td>Rs. {account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAccounts;
