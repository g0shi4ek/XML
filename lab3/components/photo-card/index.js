import { ButtonGroupComponent } from "../group-button/index.js";

export class PhotoCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card justify-content-space-around" style="width: 400px;">
                <div class="card-img-container">
                    <img src="${data.src}" class="card-img-top" alt="${data.title}">
                </div>
                <div class="card-body ">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="reactions d-flex align-items-center gap-3">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-heart text-secondary me-1"></i>
                                <span class="small">${data.likes || 0}</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <i class="fas fa-heart-broken text-secondary me-1"></i>
                                <span class="small">${data.dislikes || 0}</span>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary view-btn" data-id="${data.id}">
                        <i class="fas fa-eye me-1"></i> Просмотр
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, clickCallback) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const viewButton = this.parent.querySelector(`.view-btn[data-id="${data.id}"]`);
        viewButton.addEventListener('click', clickCallback);
    }
}