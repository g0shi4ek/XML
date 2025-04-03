
window.onload = function(){ 

let theme = true
let a = ''
let b = ''
let expressionResult = '' //результат
let selectedOperation = null // операция
let keyKode = 0

// окно вывода результата
outputElement = document.getElementById("result")

// список объектов кнопок циферблата (id которых начинается с btn_digit_)
digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')


function updateDisplay(value) {
    const maxLength = 11; // Максимальное количество символов
    let displayValue = String(value);
  
    if (displayValue.length > maxLength) {
      displayValue = Number(displayValue).toExponential(5); // Преобразуем в научный формат с 5 знаками после запятой
    }
  
    outputElement.innerHTML = displayValue;
  }


function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
            a += digit
        }
        updateDisplay(a);
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
            b += digit
            updateDisplay(b);     
        }
    }
}

// устанавка колбек-функций на кнопки циферблата по событию нажатия
digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML
        onDigitButtonClicked(digitValue)
    }
});

// установка колбек-функций для кнопок операций
document.getElementById("btn_op_mult").onclick = function() { 
    if (a === '') return
    selectedOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() { 
    if (a === '') return
    selectedOperation = '+'
}
document.getElementById("btn_op_fact").onclick = function() { // факториал 
    if (a === '') return
    selectedOperation = '!'
}
/*
document.getElementById("btn_op_div").onclick = function() { 
    if (a === '') return
    selectedOperation = '/'
} */
document.getElementById("btn_op_percent").onclick = function() {  // остаток от деления
    if (a === '') return
    selectedOperation = '%'
}


document.getElementById("btn_op_back").onclick = function() {
    if (a === '') return; // Ничего не делаем, если a пустое
  
    if (b !== '') {
      b = b.slice(0, b.length - 1); 
      updateDisplay(b);
    } else {
      a = a.slice(0, a.length - 1); // Удаляем последний символ из a
      updateDisplay(a); // Обновляем outputElement текстом переменной a
    }
}

document.getElementById("btn_op_zero").onclick = function() { //3 нуля, операция z 
    if (a === '') return
    a += "000"
    updateDisplay(a);
}


document.getElementById("btn_change_theme").onclick = function(){
    //classList.toggle(className) Добавляет указанный класс к элементу, если его нет, и удаляет, если уже присутствует
    const body = document.body;
    const elems = document.querySelector(".result");

    // Функция для замены класса на элементе (если элемент существует)
    function replaceThemeClass(element, oldTheme, newTheme) {
        if (element) {
            element.classList.replace(oldTheme, newTheme);
        }
    }

    if (body.classList.contains("dark-theme")) {
        replaceThemeClass(body, "dark-theme", "light-theme");
        replaceThemeClass(elems, "dark-theme", "light-theme");
    } else {
        replaceThemeClass(body, "light-theme", "dark-theme");
        replaceThemeClass(elems, "light-theme", "dark-theme");
    }
}


// кнопка очищения
document.getElementById("btn_op_clear").onclick = function() { 
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
}

// кнопка расчёта результата
document.getElementById("btn_op_equal").onclick = function() { 
    if (b === '' && selectedOperation){ // унарные операции
        switch (selectedOperation){
            case '^2':
                expressionResult = (+a) * (+a)
                break;
            case '!':
                if ((+a)<=170){
                    let temp = 1;
                    for (let i = 1; i < (+a); i++) { 
                        temp *= i
                    }
                    expressionResult = temp
                }
                else {
                    expressionResult = 0
                }
                break;
            case 'z':
                expressionResult = a +"000"
                break;
            case '':
                return;
        }
    }else if (a === '' || b === '' || !selectedOperation)
        return

    switch(selectedOperation) { 
        case 'x':
            expressionResult = (+a) * (+b)
            break;
        case '+':
            expressionResult = (+a) + (+b)
            break;
        case '-':
            expressionResult = (+a) - (+b)
            break;
        case '/':
            expressionResult = (+a) / (+b)
            break;
        case '%':
            expressionResult = (+a) % (+b)
            break;
        case '^2':
            expressionResult = (+a) * (+a)
            break;
    }
    
    a = expressionResult.toString()
    b = ''
    selectedOperation = null

    updateDisplay(a);
}
};