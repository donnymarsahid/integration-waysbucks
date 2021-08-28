const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getUsers, deleteUser } = require('../controllers/user');

router.post('/login', login);
router.post('/register', register);

router.get('/users', getUsers);
router.delete('/user/:id', deleteUser);

module.exports = router;
