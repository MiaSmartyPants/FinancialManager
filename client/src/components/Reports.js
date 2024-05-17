import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../App.css';

const Reports = () => {
    const { user } = useAuth0();
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [insights, setInsights] = useState({
        totalSpent: 0,
        totalIncome: 0,
        savingsRate: 0,
        goalsProgress: []
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://localhost:5050/transactions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user.email }),
                });
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        const fetchGoals = async () => {
            try {
                const response = await fetch('http://localhost:5050/goals', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user.email }),
                });
                const data = await response.json();
                setGoals(data);
            } catch (error) {
                console.error('Error fetching goals:', error);
            }
        };

        fetchTransactions();
        fetchGoals();
    }, [user]);

    useEffect(() => {
        if (transactions.length > 0 && goals.length > 0) {
            calculateInsights();
        }
    }, [transactions, goals]);

    const calculateInsights = () => {
        const totalSpent = transactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

        const totalIncome = transactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);

        const savingsRate = totalIncome !== 0 ? ((totalIncome - totalSpent) / totalIncome) * 100 : 0;

        const goalsProgress = goals.map(goal => {
            const progress = (parseFloat(goal.currentAmount) / parseFloat(goal.targetAmount)) * 100;
            return { ...goal, progress };
        });

        setInsights({
            totalSpent,
            totalIncome,
            savingsRate,
            goalsProgress
        });
    };

    return (
        <div className="reports-container">
            <h2>Financial Reports</h2>
            <div className="report">
                <h2>Total Spent</h2>
                <p>${insights.totalSpent.toFixed(2)}</p>
            </div>
            <div className="report">
                <h2>Total Income</h2>
                <p>${insights.totalIncome.toFixed(2)}</p>
            </div>
            <div className="report">
                <h2>Savings Rate</h2>
                <p>{insights.savingsRate.toFixed(2)}%</p>
            </div>
            <div className="report">
                <h2>Goals Progress</h2>
                {insights.goalsProgress.map((goal, index) => (
                    <div key={index}>
                        <p>{goal.name}: {goal.progress.toFixed(2)}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
