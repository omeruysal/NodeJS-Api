const express = require('express');
const router = express.Router();
const ProductsController = require('../controller/ProductController');
const checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth, ProductsController.get_all)

router.get('/:id', ProductsController.get_by_id)

router.post('/', checkAuth, ProductsController.create)

router.delete("/:id", checkAuth, ProductsController.delete)


module.exports = router;