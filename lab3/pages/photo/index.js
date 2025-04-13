import { BackButtonComponent } from "../../components/back-button/index.js";
import { EditModalComponent } from "../../components/edit-modal/index.js";
import { PhotoComponent } from "../../components/photo/index.js";
import { MainPage } from "../main/index.js";
import { getStockById, updateStock } from "../requests.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = parseInt(id, 10);
        this.editModal = new EditModalComponent(document.body);
        this.photoData = null;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page" class="p-4">
                <div id="button-container" class="mb-3 d-flex gap-2">
                    <div id="back-container"></div>
                    <div id="update-container"></div>
                </div>
                <div id="photo-container"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    setupEditModal() {
        this.editModal.render(async (formData) => {
            try {
                await updateStock(this.id, formData);
                this.editModal.hide();
                this.photoData = await getStockById(this.id);
                this.renderPhoto();
            } catch (error) {
                console.error('Update failed:', error);
                alert('Ошибка при обновлении');
            }
        });
    }

    renderPhoto() {
        const photoContainer = document.getElementById('photo-container');
        photoContainer.innerHTML = ''; // Очищаем контейнер перед рендером
        const photoComponent = new PhotoComponent(photoContainer);
        photoComponent.render(this.photoData);
    }

    async render() {
        try {
            this.parent.innerHTML = '';
            this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
            const backContainer = document.getElementById('back-container');
            const backButton = new BackButtonComponent(backContainer);
            backButton.render(this.clickBack.bind(this));

            this.photoData = await getStockById(this.id);
            this.renderPhoto();
            
            // кнопка редактирования
            const updateContainer = document.getElementById('update-container');
            const editButton = document.createElement('button');
            editButton.className = 'btn btn-outline-secondary';
            editButton.textContent = 'Редактировать';
            editButton.addEventListener('click', () => {
                this.editModal.show(this.photoData);
            });
            updateContainer.appendChild(editButton);
            
            this.setupEditModal();
            
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            this.parent.innerHTML = `<p>Ошибка при загрузке данных. Пожалуйста, попробуйте позже.</p>`;
        }
    }
}