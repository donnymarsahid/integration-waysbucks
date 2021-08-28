const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getUsers, deleteUser, addProfile } = require('../controllers/user');
const { auth } = require('../middlewares/auth');

router.post('/login', login);
router.post('/register', register);

router.get('/users', getUsers);
router.delete('/user/:id', deleteUser);
router.post('/user', auth, addProfile);

module.exports = router;
