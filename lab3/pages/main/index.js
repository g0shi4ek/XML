import {PhotoCardComponent} from "../../components/photo-card/index.js";
import { AddModalComponent } from "../../components/add-modal/index.js";
import {ProductPage} from "../photo/index.js";
import { getStocks, addStock } from "../requests.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
        this.addModal = new AddModalComponent(document.body);
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
        <div id="main-page" class="d-flex flex-column">
            <div class="d-flex justify-content-between align-items-center p-4">
                <h1 class="m-0 text-light-emphasis">Мои карточки</h1>
                <button id="add-button" class="btn btn-outline-secondary">Добавить карточку</button>
            </div>
            <div class="d-flex flex-wrap gap-4 p-4 justify-content-center" id="cards-container"></div>
        </div>`;
    }

    clickCard(id) {
        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    async render() {
        this.parent.innerHTML = ''; // Очищаем перед добавлением
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Находим кнопку в DOM и добавляем обработчик
        const addButton = document.getElementById('add-button');
        addButton.addEventListener('click', () => this.addModal.show());

        try {
            this.data = await getStocks();
            const cardsContainer = document.getElementById('cards-container');
            
            // Рендерим карточки после получения данных
            this.data.forEach(item => {
                const photoCard = new PhotoCardComponent(cardsContainer);
                photoCard.render(item, (e) => {
                    const cardId = e.target.dataset.id;
                    this.clickCard(cardId);
                });
            });

        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            this.parent.innerHTML = `<p>Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>`;
        }

        this.addModal.render(async (formData) => {
            try {
                await addStock(formData);
                this.addModal.hide();
                this.render(); // Перерисовываем страницу
            } catch (error) {
                console.error('Ошибка при добавлении:', error);
                alert('Ошибка при добавлении карточки');
            }
        });
    }
}