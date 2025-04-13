const {StockDAO} = require('./stocksDAO');

class StocksService {
    static findStocks(id) {
        if (id !== undefined) {
            return StockDAO.findById(id).toJSON();
        }
        return StockDAO.find().map((stock) => stock.toJSON());
    }

    static addStock(stock) {
        return StockDAO.insert(stock).toJSON();
    }

    static updateStock(id, stock){
        return StockDAO.update(id, stock);
    }

    static deleteStock(id) {
        return StockDAO.delete(id).map((stock) => stock.toJSON());
    }

    static likeStock(id) {
        return StockDAO.updateReaction(id, 'likes').toJSON();
    }

    static dislikeStock(id) {
        return StockDAO.updateReaction(id, 'dislikes').toJSON();
    }


}

module.exports = {
    StocksService,
}