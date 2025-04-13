export class EditModalComponent {
    constructor(parent) {
        this.parent = parent;
        this.modal = null;
    }

    getHTML() {
        return `
            <div class="modal fade" id="editModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Редактировать карточку</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editForm">
                                <input type="hidden" id="editId">
                                <div class="mb-3">
                                    <label class="form-label">Название</label>
                                    <input type="text" class="form-control" id="editTitle" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Описание</label>
                                    <textarea class="form-control" id="editText" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">Изображение (URL)</label>
                                    <input type="text" class="form-control" id="editURL" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                            <button type="button" class="btn btn-primary" id="editSubmit">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(onSubmit) {
        if (document.getElementById('editModal')) {
            return; // Если модальное окно уже существует, не создаем его снова
        }
        
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.modal = new bootstrap.Modal(document.getElementById('editModal'));
        
        document.getElementById('editSubmit').addEventListener('click', async () => {
            const formData = {
                id: document.getElementById('editId').value,
                title: document.getElementById('editTitle').value,
                text: document.getElementById('editText').value,
                src: document.getElementById('editURL').value,
            };
            await onSubmit(formData);
        });
    }

    show(data) {
        document.getElementById('editId').value = data.id;
        document.getElementById('editTitle').value = data.title;
        document.getElementById('editText').value = data.text;
        document.getElementById('editURL').value = data.src;
        this.modal.show();
    }

    hide() {
        this.modal.hide();
    }
}