const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getUsers, deleteUser, addProfile } = require('../controllers/user');
const { authToken, permission } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

router.post('/login', login);
router.post('/register', register);

router.get('/users', authToken, permission('user'), getUsers);
router.delete('/user/:id', deleteUser);
router.post('/user', authToken, uploadFile('image'), addProfile);

module.exports = router;
