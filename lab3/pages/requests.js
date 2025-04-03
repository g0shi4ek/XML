// Получение всех данных
export async function getStocks() {
    try {
        const response = await fetch('http://localhost:8000/stocks');
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        throw error;
    }
}

// Добавление новой карточки
export async function addStock(newStock) {
    try {
        const response = await fetch('http://localhost:8000/stocks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStock),
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Ошибка при добавлении:", error);
        throw error;
    }
}

// Получение данных по ID
export async function getStockById(id) {
    try {
        const response = await fetch(`http://localhost:8000/stocks/${id}`);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при получении данных по ID:", error);
        throw error;
    }
}

// Удаление по ID
export async function deleteStockById(id) {
    try {
        const response = await fetch(`http://localhost:8000/stocks/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return { status: response.status, message: 'Удаление успешно' };
    } catch (error) {
        console.error("Ошибка при удалении:", error);
        throw error;
    }
}
