const express = require('express');
const router = express.Router();

const { login, register, checkAuth } = require('../controllers/auth');
const { addProduct, getProducts, detailProduct, updateProduct, deleteProduct, getTypeCoffee } = require('../controllers/product');
const { getToppings, addTopping, detailTopping, updateTopping, deleteTopping } = require('../controllers/topping');
const { getUsers, deleteUser } = require('../controllers/user');
const { authToken, permission } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Authentification
router.post('/login', login);
router.post('/register', register);
router.get('/check-auth', authToken, checkAuth);

// User
router.get('/users', getUsers);
router.delete('/user/:id', authToken, permission('admin'), deleteUser);

// Product
router.get('/products', getProducts);
router.get('/product/:id', detailProduct);
router.get('/typecoffee', getTypeCoffee);
router.post('/product', authToken, permission('admin'), uploadFile('image'), addProduct);
router.put('/product/:id', authToken, permission('admin'), uploadFile('image'), updateProduct);
router.delete('/product/:id', authToken, permission('admin'), deleteProduct);

// Topping
router.get('/toppings', getToppings);
router.get('/topping/:id', detailTopping);
router.post('/topping', authToken, permission('admin'), uploadFile('image'), addTopping);
router.put('/topping/:id', authToken, permission('admin'), uploadFile('image'), updateTopping);
router.delete('/topping/:id', authToken, permission('admin'), deleteTopping);

module.exports = router;
