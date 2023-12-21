import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import AllAccounts from './components/AllAccounts';
import TransactionHistory from './components/TransactionHistory';
import DepositWithdrawal from './components/DepositWithdrawal';
import CustomerTransactions from './components/CustomerTransaction';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/accounts" element={<AllAccounts />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/deposit-withdrawal" element={<DepositWithdrawal />} />
          <Route path="/transactions/:id" element={<CustomerTransactions/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
