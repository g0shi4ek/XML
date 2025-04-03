export class ButtonGroupComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="btn-group" role="group">
                <button type="button" class="btn btn-outline-secondary like-btn" data-id="${data.id}">
                    <i class="fas fa-heart text-secondary me-1"></i> Нравится ${data.likes || 0}
                </button>
                <button type="button" class="btn btn-outline-secondary dislike-btn" data-id="${data.id}">
                    <i class="fas fa-heart-broken text-secondary me-1"></i> Не нравится ${data.dislikes || 0}
                </button>
            </div>
        `;
    }

    async handleReaction(id, type) {
        try {
            const response = await fetch(`http://localhost:8000/stocks/${id}/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating reaction:', error);
        }
    }

    render(data) {
        this.parent.innerHTML = ''; // Очищаем перед добавлением
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        const likeBtn = this.parent.querySelector('.like-btn');
        const dislikeBtn = this.parent.querySelector('.dislike-btn');

        likeBtn.addEventListener('click', async () => {
            const updatedData = await this.handleReaction(data.id, 'like');
            if (updatedData) {
                likeBtn.innerHTML = `<i class="fas fa-heart text-secondary me-1"></i> Нравится ${updatedData.likes}`;
                dislikeBtn.innerHTML = `<i class="fas fa-heart-broken text-secondary me-1"></i> Не нравится ${updatedData.dislikes}`;
            }
        });

        dislikeBtn.addEventListener('click', async () => {
            const updatedData = await this.handleReaction(data.id, 'dislike');
            if (updatedData) {
                likeBtn.innerHTML = `<i class="fas fa-heart text-secondary me-1"></i> Нравится ${updatedData.likes}`;
                dislikeBtn.innerHTML = `<i class="fas fa-heart-broken text-secondary me-1"></i> Не нравится ${updatedData.dislikes}`;
            }
        });
    }
}