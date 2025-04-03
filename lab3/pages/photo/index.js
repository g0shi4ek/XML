import { BackButtonComponent } from "../../components/back-button/index.js";
import { PhotoComponent } from "../../components/photo/index.js";
import { MainPage } from "../main/index.js";
import { getStockById } from "../requests.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id, 10);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="p-4">
                <div id="back-container"></div>
                <div id="photo-container"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    async render(){
        try {
            this.parent.innerHTML = ''; // Очищаем перед добавлением
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
            const backContainer = document.getElementById('back-container');
            const backButton = new BackButtonComponent(backContainer);
            backButton.render(this.clickBack.bind(this));

            const photoData = await getStockById(this.id);
            
            const photoContainer = document.getElementById('photo-container');
            const photoComponent = new PhotoComponent(photoContainer);
            photoComponent.render(photoData);
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            this.parent.innerHTML = `<p>Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>`;
        }
    }
}