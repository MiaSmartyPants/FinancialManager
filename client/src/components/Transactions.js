
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../App.css'; // Add some basic styles if needed

const Transactions = () => {

  const { user } = useAuth0();
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({ id: '', type: '', amount: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction({ ...transaction, [name]: value });
  };

  const addTransaction = (e) => {
    setTransactions([...transactions, { ...transaction}]);
    setTransaction({ id: '', type: '', amount: '', description: '' });
    storeTransactions(e, transaction)
    
    
  };
  const storeTransactions = (e, transaction) => {
    console.log(transaction)
    e.preventDefault();
        fetch('http://localhost:5050/addtransaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...transaction, email: user.email }),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log('Transaction added:', data);
          setTransaction({ type: '', amount: '', description: '' });
        })
        .catch((error) => console.error('Error adding transaction:', error));
  }

  const editTransaction = (id) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);
    setTransaction(transactionToEdit);
    deleteTransaction(id);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };
  
  return (
    <div className="transaction-manager">
              <h2>Transactions</h2>
      <div className="transaction-form">
        <select name="type" value={transaction.type} onChange={handleInputChange}>
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="savings">Savings</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={transaction.amount}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={transaction.description}
          onChange={handleInputChange}
        />
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
      <div className="transaction-list">
        <h2></h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <span>{transaction.type}</span> - 
              <span>{transaction.amount}</span> - 
              <span>{transaction.description}</span>
              <button onClick={() => editTransaction(transaction.id)}>Edit</button>
              <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Transactions;
