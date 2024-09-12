const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get postlogin
const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const getEcypt = `${user.id}${user.name}${user.email}${password}`
    const isMatch = await bcrypt.compare(getEcypt, user.password);

    if (!isMatch) {
      return res.status(400).json({  status: 'unsuccess', message: 'Invalid email or password' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    //  sessionStorage.setItem('tkn',token);

    res.json({
      status: res.statusCode,
      message: 'Login successful',
      userID: user.id,
      token: token,
    });

  } catch (error) {
    console.error(error);
      res.status(500).json({
         status: 'invalid',
         message: 'Server error' 
      });
  }

};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await db('users').select('*');

    const dt = {
      status: res.statusCode,
      data: users,
      lenght: users.length
  };

    res.json(dt);

  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
};

// Get all users with  suffix (example function)
const getUserId = async (req, res) => {
  const id = req.params.id;
  
  try {
    const user = await db('users').select('*').where({id});
    const data= [{
      'status': res.statusCode,
      'data': user,
      'lenght': user.length
      
    }];

    res.json(data);
  
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
};



module.exports = {
  postLogin,
  getAllUsers,
  getUserId,
};