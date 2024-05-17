import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../App.css';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({ name: '', targetAmount: '', currentAmount: '' });
    const { user } = useAuth0();

    useEffect(() => {
            fetch('http://localhost:5050/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: user.email }),
            })
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setGoals(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            })
            .catch((error) => console.error('Error fetching goals:', error));
    }, [goals]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGoal({ ...newGoal, [name]: value });
    };

    const addGoal = (e) => {
        e.preventDefault();
        if (newGoal.name && newGoal.targetAmount && newGoal.currentAmount) {
            fetch('http://localhost:5050/postgoals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...newGoal, email: user.email }),
            })
            .then((response) => response.json())
            .then((data) => {
                setGoals([...goals, data]);
                setNewGoal({ name: '', targetAmount: '', currentAmount: '' });
            })
            .catch((error) => console.error('Error adding new goal:', error));
        }
    };

    const calculateProgress = (goal) => {
        return (goal.currentAmount / goal.targetAmount) * 100;
    };
    return (
        <div className="goals-container">
            <h2>Financial Goals</h2>
            <form className="goal-form" onSubmit={addGoal}>
                <input
                    type="text"
                    name="name"
                    placeholder="Goal Name"
                    value={newGoal.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="targetAmount"
                    placeholder="Target Amount"
                    value={newGoal.targetAmount}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="currentAmount"
                    placeholder="Current Amount"
                    value={newGoal.currentAmount}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Goal</button>
            </form>
            {goals.length > 0 ? (
                <div className="goals-grid">
                    {goals.map((goal, index) => (
                        <div key={index} className="goal-card">
                            <h2>{goal.name}</h2>
                            <p>Target: ${goal.targetAmount}</p>
                            <p>Current: ${goal.currentAmount}</p>
                            <div className="progress-bar">
                                <div
                                    className="progress"
                                    style={{ width: `${calculateProgress(goal)}%` }}
                                ></div>
                            </div>
                            <p>{calculateProgress(goal).toFixed(2)}% Complete</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Looks like you're new. Add your first goal to our database!</p>
            )}
            
        </div>
    );
};

export default Goals;
