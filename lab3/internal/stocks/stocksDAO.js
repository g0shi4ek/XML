const {StocksRepository} = require('./stocksRepository');

class StockDAO {
    constructor(id, src, title, text,likes = 0, dislikes = 0) {
        this.id = id;
        this.src = src;
        this.title = title;
        this.text = text;
        this.likes = likes;
        this.dislikes = dislikes;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(stock) {
        if (
            stock.id === undefined ||
            stock.src === undefined ||
            stock.title === undefined ||
            stock.text === undefined 
        ) {
            throw new Error('invalidate stock data');
        }

        this._validateId(stock.id);
    }

    static find() {
        const stocks = StocksRepository.read();

        return stocks.map(({id, src, title, text, likes, dislikes}) => {
            return new this(id, src, title, text, likes, dislikes);
        });
    }

    static findById(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const stock = stocks.find((s) => s.id === id);

        return new this(stock.id, stock.src, stock.title, stock.text, stock.likes, stock.dislikes);
    }

    static insert(stock) {
        this._validate(stock);

        const stocks = StocksRepository.read();
        StocksRepository.write([...stocks, stock]);

        return new this(stock.id, stock.src, stock.title, stock.text, stock.likes, stock.dislikes);
    }

    static delete(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const filteredStocks = stocks.filter((s) => s.id !== id);

        StocksRepository.write(filteredStocks);

        return filteredStocks.map(({id, src, title, text, like, dislike}) => {
            return new this(id, src, title, text, like, dislike);
        });
    }

    static updateReaction(id, reactionType) {
        this._validateId(id);
        
        const stocks = StocksRepository.read();
        const stockIndex = stocks.findIndex(s => s.id === id);
        
        // Обновляем счетчик
        stocks[stockIndex][reactionType] = (stocks[stockIndex][reactionType] || 0) + 1;
        
        StocksRepository.write(stocks);
        
        return new this(
            stocks[stockIndex].id,
            stocks[stockIndex].src,
            stocks[stockIndex].title,
            stocks[stockIndex].text,
            stocks[stockIndex].likes,
            stocks[stockIndex].dislikes
        );
    }

    toJSON() {
        return {
            id: this.id,
            src: this.src,
            title: this.title,
            text: this.text,
            likes: this.likes, 
            dislikes: this.dislikes
        }
    }

    
}

module.exports = {
    StockDAO,
}