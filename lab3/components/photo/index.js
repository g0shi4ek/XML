import { ButtonGroupComponent } from "../group-button/index.js";


export class PhotoComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class = "row">
                <div class = "col-6">
                    <div class="card" style="width: 100%;">
                        <img src="${data.src}" class="card-img-top" alt="${data.title}">
                        <div class="card-body">
                            <h2 class="card-title">${data.title}</h2>
                            <p class="card-text">${data.text}</p>
                            <div id="button-group-${data.id}"></div>
                        </div>
                    </div>
                </div>
                <div class = "col">
                    <div id = "comments">
                        <div class="card">
                            <div class="card-body mb-2">
                                <h2>Новый комментарий</h2>
                                <textarea class="form-control mb-3" rows="4" placeholder="Введите текст"></textarea>
                                <button class="btn btn-outline-secondary" type="submit">Отправить</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `;
    }

    render(data) {
        this.parent.innerHTML = ''; // Очищаем перед добавлением
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));
        
        const buttonGroupContainer = document.getElementById(`button-group-${data.id}`);
        const buttonGroup = new ButtonGroupComponent(buttonGroupContainer);
        buttonGroup.render(data);        
    }
}