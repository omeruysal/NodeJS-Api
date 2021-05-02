const express = require('express');
const router = express.Router();
const OrderController = require('../controller/OrderController');
const checkAuth = require('../middleware/check-auth');

router.get('/',checkAuth, OrderController.get_all)

router.get('/:id',checkAuth, OrderController.get_by_id)

router.post('/',checkAuth, OrderController.create)

router.delete("/:id", checkAuth,OrderController.delete)


module.exports = router;