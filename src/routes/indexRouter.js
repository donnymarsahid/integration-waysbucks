const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getUsers, deleteUser, addProfile } = require('../controllers/user');
const { authToken, permission } = require('../middlewares/auth');

router.post('/login', login);
router.post('/register', register);

router.get('/users', authToken, permission('admin'), getUsers);
router.delete('/user/:id', deleteUser);
router.post('/user', authToken, addProfile);

module.exports = router;
