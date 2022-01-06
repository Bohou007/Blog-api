const express = require('express');
const router = express.Router();

const CategoriesController = require('../controllers/CategoriesController');

router.get('/', CategoriesController.getAllCategories);
router.get('/:slug', CategoriesController.getOneCategory);
router.post('/', CategoriesController.createCategory);

module.exports = router;