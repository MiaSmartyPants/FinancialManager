const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'financial_manager',
  password: 'password123',
  port: 5432,
})


const addUserInfo = (request, response) => {
  const { name, email, picture } = request.body;

  pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
    if (error) {
      console.error('Error checking user existence:', error);
    }

    if (results.rows.length > 0) {
      // User already exists
      response.json('User already exists');
    } else {
      pool.query(
        'INSERT INTO users (name, email, picture) VALUES ($1, $2, $3) RETURNING *',
        [name, email, picture],

      );
    }
  });
};


const addGoal = (request, response) => {
  const { email, name, targetAmount, currentAmount } = request.body;
  // console.log('parseint', request.body)
  pool.query(
    'INSERT INTO goals (user_email, name, target_amount, current_amount) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, name, parseInt(targetAmount), parseInt(currentAmount)],
    (error, results) => {
      if (error) {
        console.log(error);
      }
      const newGoal = results.rows[0];

      response.status(200).json({
        name: newGoal.name,
        targetAmount: newGoal.target_amount,
        currentAmount: newGoal.current_amount,
        user_email: newGoal.user_email,
      });
    }
  );
};

const getGoals = (request, response) => {
  const { email } = request.body;

  pool.query(
    'SELECT name, target_amount AS "targetAmount", current_amount AS "currentAmount" FROM goals WHERE user_email = $1',
    [email],
    (error, results) => {
      if (error) {
        console.log('Error fetching goals:', error);
      }
      response.status(200).json(results.rows);
    }
  );
};



const addTransaction = (request, response) => {
  const { email, type, amount, description } = request.body;
  console.log('addTransaction', email, type, amount, description)
  pool.query(
    'INSERT INTO transactions (user_email, type, amount, description) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, type, parseFloat(amount), description],
    (error, results) => {
      if (error) {
        console.log('Error inserting transaction:', error);
      } else {
        response.status(200).json(results.rows[0]);
      }
    }
  );
};

const getTransactions = (request, response) => {
  const { email } = request.body;
  pool.query('SELECT * FROM transactions WHERE user_email = $1', [email], (error, results) => {
    if (error) {
      console.log('Error fetching transactions:', error);
    } else {
      response.status(200).json(results.rows);
      // console.log(results.rows)
    }
  });

};



module.exports = {
  addUserInfo,
  addGoal,
  getGoals,
  addTransaction,
  getTransactions,
}