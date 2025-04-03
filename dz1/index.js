function isPalindrome1(str) {
    const result = String(str).toLowerCase().replaceAll(' ', '');
    return result === result.split('').reverse().join('');
}

function isPalindrome2(str) {
    const result = String(str).toLowerCase().replaceAll(' ', '');
    let left = 0;
    let right = result.length - 1;

    while (left < right) {
        if (result[left] !== result[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}


console.log(isPalindrome1('А роза упала на лапу Азора')); // true
console.log(isPalindrome1(121)); // true
console.log(isPalindrome1(1890)); // false

console.log(isPalindrome2('А роза упала на лапу Азора')); // true
console.log(isPalindrome2(121)); // true
console.log(isPalindrome2(1890)); // false