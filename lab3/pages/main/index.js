import {PhotoCardComponent} from "../../components/photo-card/index.js";
import {ProductPage} from "../photo/index.js";
import { getStocks } from "../requests.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `<div id="main-page" class="d-flex flex-wrap gap-4 p-4 justify-content-center"></div>`;
    }

    clickCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }


    async render() {
        this.parent.innerHTML = ''; // Очищаем перед добавлением
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        try {
            this.data = await getStocks();
            // Рендерим карточки после получения данных
            this.data.forEach(item => {
                const photoCard = new PhotoCardComponent(this.pageRoot);
                photoCard.render(item, (e) => {
                    const cardId = e.target.dataset.id;
                    this.clickCard(cardId);
                });
            });
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            this.parent.innerHTML = `<p>Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>`;
        }
    }
}