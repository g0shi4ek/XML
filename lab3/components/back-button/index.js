export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `<button id="back-button" class="btn btn-outline-secondary mb-4">Назад</button>`;
    }

    addListeners(callback) {
        document.getElementById('back-button').addEventListener('click', callback);
    }

    render(callback) {
        this.parent.innerHTML = this.getHTML();
        this.addListeners(callback);
    }
}