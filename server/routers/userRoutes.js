const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, createUser, deleteUser, updateUser} = require('../controllers/userController');

router.get('/api/user/get', (req, res) => getAllUsers(req, res));
router.get('/api/user/get/:id', (req, res) => getUserById(req, res));
router.post('/api/user/create', (req, res) => createUser(req, res));
router.delete('/api/user/delete/:id', (req, res) => deleteUser(req, res));
router.put('/api/user/update/:id', (req, res) => updateUser(req, res));

module.exports = router;

