export class AddModalComponent {
    constructor(parent) {
        this.parent = parent;
        this.modal = null;
    }

    getHTML() {
        return `
            <div class="modal fade" id="addModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Добавить новую карточку</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addForm">
                                <div class="mb-3">
                                    <label class="form-label">Название</label>
                                    <input type="text" class="form-control" id="addTitle" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Описание</label>
                                    <textarea class="form-control" id="addText" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Изображение (URL)</label>
                                    <input type="text" class="form-control" id="addURL" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="addSubmit">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(onSubmit) {
        if (document.getElementById('addModal')) {
            return;
        }
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.modal = new bootstrap.Modal(document.getElementById('addModal'));
        
        document.getElementById('addSubmit').addEventListener('click', async () => {
            const formData = {
                title: document.getElementById('addTitle').value,
                text: document.getElementById('addText').value,
                src: document.getElementById('addURL').value
            };
            await onSubmit(formData);
        });
    }

    show() {
        // Очищаем форму перед показом
        document.getElementById('addForm').reset();
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }
}