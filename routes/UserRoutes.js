const express = require('express');
const router = express.Router();
const Middleware = require('../middlewares/VerifyToken');
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getOneUser);


module.exports = router;