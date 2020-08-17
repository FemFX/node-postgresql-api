const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123',
  database: 'firstapi',
  post: '5432',
});

const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM users');
  res.json(response.rows);
};
const getUserById = async (req, res) => {
  const response = await pool.query('SELECT * FROM users WHERE id = $1', [
    req.params.id,
  ]);
  res.status(200).json(response.rows);
};
const createUser = async (req, res) => {
  const { name, email } = req.body;
  const response = await pool.query(
    'INSERT INTO users (name,email) VALUES ($1,$2)',
    [name, email]
  );
  res.json({
    message: 'User Added',
    body: {
      user: { name, email },
    },
  });
};
const deleteUser = async (req, res) => {
  const response = await pool.query('DELETE FROM users WHERE id = $1', [
    req.params.id,
  ]);
  res.json({
    message: 'User deleted',
  });
};
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const response = await pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, req.params.id]
  );
  res.json({
    message: 'User Updated',
  });
};

module.exports = { getUsers, createUser, getUserById, deleteUser, updateUser };
