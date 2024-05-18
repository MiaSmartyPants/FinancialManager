// UserInfoCard.js

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../App.css';
import FinanceJokes from './FinanceJokes';

const UserInfoCard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  const sendUserInfoToServer = () => {
    fetch('http://localhost:5050/userinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        picture: user.picture,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User info sent to server: ', data);
      })
      .catch(error => {
        console.error('Error sending user info to server:', error);
      });
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      sendUserInfoToServer();
    }
  }, [isAuthenticated]);
  
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className="user-info-card">
        <img src={user.picture} alt={user.name} className="user-info-card-image" />
        <div className="user-info-card-content">
          <h2 className="user-info-card-title">{user.name}</h2>
          <p className="user-info-card-email">{user.email}</p>
        </div>
        
        <FinanceJokes />
      </div>
    )
  );
};

export default UserInfoCard;
