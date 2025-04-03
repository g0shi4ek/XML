const express = require('express');
const {StocksController} = require('./stocksController');

const router = express.Router();

router.get('/', StocksController.findStocks);
router.get('/:id', StocksController.findStockById);
router.post('/', StocksController.addStock);
router.delete('/:id', StocksController.deleteStock);
router.post('/:id/like', StocksController.likeStock);
router.post('/:id/dislike', StocksController.dislikeStock);


module.exports = router;