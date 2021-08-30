const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');
const { getCarts, addCart, deleteCart } = require('../controllers/cart');
const { addProduct, getProducts, detailProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { getToppings, addTopping, detailTopping, updateTopping, deleteTopping } = require('../controllers/topping');
const { addTransaction, getTransactions, getUserTransaction, deleteTransaction } = require('../controllers/transaction');
const { getUsers, deleteUser, addProfile } = require('../controllers/user');
const { authToken, permission } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

router.post('/login', login);
router.post('/register', register);

router.get('/users', getUsers);
router.delete('/user/:id', deleteUser);
router.post('/profile', authToken, uploadFile('image'), addProfile);

router.get('/products', getProducts);
router.get('/product/:id', detailProduct);
router.post('/product', authToken, permission('admin'), uploadFile('image'), addProduct);
router.put('/product/:id', authToken, permission('admin'), updateProduct);
router.delete('/product/:id', authToken, permission('admin'), deleteProduct);

router.get('/toppings', getToppings);
router.get('/topping/:id', detailTopping);
router.post('/topping', authToken, permission('admin'), uploadFile('image'), addTopping);
router.put('/topping/:id', authToken, permission('admin'), updateTopping);
router.delete('/topping/:id', authToken, permission('admin'), deleteTopping);

router.get('/carts', getCarts);
router.post('/cart/:id', authToken, addCart);
router.delete('/cart/:id', authToken, deleteCart);

router.get('/transactions', authToken, getTransactions);
router.post('/transaction', authToken, uploadFile('image'), addTransaction);
router.get('/transaction/:id', authToken, getUserTransaction);
router.delete('/transaction/:id', authToken, deleteTransaction);

module.exports = router;
