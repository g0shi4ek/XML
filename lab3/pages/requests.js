const BASE_URL = 'http://localhost:8000/stocks';

// Общая функция для выполнения XHR запросов
function makeXHRRequest(method, url, data = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = xhr.responseText ? JSON.parse(xhr.responseText) : null;
                    resolve(response);
                } catch (e) {
                    reject(new Error('Invalid JSON response'));
                }
            } else {
                reject(new Error(`Request failed with status ${xhr.status}`));
            }
        };

        xhr.onerror = function() {
            reject(new Error('Network error'));
        };

        xhr.send(data ? JSON.stringify(data) : null);
    });
}

// Получение всех данных
export function getStocks() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', BASE_URL, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } catch (e) {
                    reject(new Error("Ошибка при парсинге данных"));
                }
            } else {
                reject(new Error(`Ошибка: ${xhr.status}`));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error("Ошибка сети"));
        };
        
        xhr.send();
    });
}

// Добавление новой карточки
export function addStock(newStock) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', BASE_URL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } catch (e) {
                    reject(new Error("Ошибка при парсинге ответа"));
                }
            } else {
                reject(new Error(`Ошибка: ${xhr.status}`));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error("Ошибка сети"));
        };
        
        xhr.send(JSON.stringify(newStock));
    });
}

// Обновление карточки
export function updateStock(id, newStock) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', `${BASE_URL}/update/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } catch (e) {
                    reject(new Error("Ошибка при парсинге ответа"));
                }
            } else {
                reject(new Error(`Ошибка: ${xhr.status}`));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error("Ошибка сети"));
        };
        
        xhr.send(JSON.stringify(newStock));
    });
}

// Получение данных по ID
export function getStockById(id) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${BASE_URL}/${id}`, true);
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } catch (e) {
                    reject(new Error("Ошибка при парсинге данных"));
                }
            } else {
                reject(new Error(`Ошибка: ${xhr.status}`));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error("Ошибка сети"));
        };
        
        xhr.send();
    });
}

// Удаление по ID
export function deleteStockById(id) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${BASE_URL}/${id}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve({ status: xhr.status, message: 'Удаление успешно' });
            } else {
                reject(new Error(`Ошибка: ${xhr.status}`));
            }
        };
        
        xhr.onerror = function() {
            reject(new Error("Ошибка сети"));
        };
        
        xhr.send();
    });
}