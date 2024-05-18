import React, { useState, useEffect } from 'react';

const FinanceJokes = () => {
    const [joke, setJoke] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch a random Chuck Norris joke
        fetch('https://api.chucknorris.io/jokes/random?category=money')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch joke');
                }
                return response.json();
            })
            .then(data => {
                setJoke(data.value);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h4>Finance Joke</h4>
            <p>{joke}</p>
        </div>
    );
};

export default FinanceJokes;
