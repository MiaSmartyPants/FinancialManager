# FinancialManager
A personal finance management application that will allow users to track their income, expenses, savings, providing insights into their financial health, and helping them make informed financial decisions.

## Features
<br>
- Third-party API jokes about money!
<br>
- User Registration and Login: Allow users to sign up and log in to their accounts.
<br>
- User Authentication: The system should securely authenticate users and manage their sessions.
<br>
- Transaction Management: Enable users to add, edit, and delete transactions, categorizing them as income, expenses, or savings.
<br>
- Financial Goals: Allow users to set financial goals, such as saving for a vacation or retirement, and track their progress towards these goals.
<br>
- Insights and Reports: Provide users with insights and reports on their spending habits, savings rate, and progress towards financial goals.


## Installation
To get started with the Financial Manager, follow these steps:

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/miasmartypants/FinancialManager.git
   ```

2. Navigate to the project directory:
   ```bash
   cd FinancialManager
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up the database:
   - Ensure you have PostgreSQL installed on your machine.
   - Log in to PostgreSQL using the `psql` command line tool.
   - Run the following commands to create the database and user:
     ```sql
     CREATE DATABASE financial_manager;
     CREATE USER me WITH ENCRYPTED PASSWORD 'password123';
     GRANT ALL PRIVILEGES ON DATABASE financial_manager TO me;
     ```

5. Initialize the database schema:
   - Run the `init.sql` script located in the `database` directory to create the necessary tables and schema.
     ```bash
     psql -U me -d financial_manager -a -f database/init.sql
     ```

## Usage
After completing the installation steps, you can start the Financial Manager application:
```bash
cd client
npm start
```
 ```bash
   cd server
   node server.js
   ```

Access the application in your web browser at `http://localhost:3000`.
