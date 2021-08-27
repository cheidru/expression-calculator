function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here

    let exprStr = expr.replace(/ /g,'');  // remove spaces
    let strArr = [];
    strArr = exprStr.split(''); // split string into letter array
    let inBracketsResult = {}; // first: calculation result or null if division by zero , second: index position of end

    // check brackets pairing
    if (checkBrackets(strArr) === false) throw new ExpressionError("ExpressionError: Brackets must be paired");

    let stack = [];

    return srtArr;

    for (let i = 0; i < strArr.length; i++) {

        if (strArr[i] == '(') { // calculate expression in brackets
            inBracketsResult = inBrackets(strArr, i);
            if (inBracketsResult.result == null) return new TypeError("TypeError: Division by zero.");
            i = inBracketsResult.position // new index position after expression in brackets calculated
            stack.push(inBracketsResult.result);
        } else {
            stack.push(strArr[i])
        }
    }

    return calcString(stack);
}


function inBrackets(strArr, openBracketPosition) {
    let stack = [];
    let bracketCount = 1;
    let result = '';
    let inBracketsResult = {};
    for (let i = openBracketPosition + 1; i < strArr.length; i++) {
        if (strArr[i] == ')') {
            result = calcString(stack); 
            if (result === null) {
                inBracketsResult.position = 0;
                inBracketsResult.result = null;
                return inBracketsResult;
            } else {
                stack.push(result)
                bracketCount--
            }
            
            if (bracketCount == 0) {
                inBracketsResult.position = i - 1;
                inBracketsResult.result = stack.pop;
                return inBracketsResult;
            }
        } else if (strArr[i] == '(') {
            inBracketResult = inBrackets(strArr, i);
            i = inBracketResult.position + 1;
            stack.push(inBracketResult.result);
            bracketCount++;
        } else {
            stack.push(strArr[i]);
        }
    }
}

function calcPair (first, operator, second) {
    
    let firstNum = Number(first);
    let secondNum = Number(second);
    let result = '';

    switch(operator) {
        case '-':
            result = String(firstNum - secondNum);
            break;
        case '+':
            result = String(firstNum + secondNum);
            break;
        case '*':
            result = String(firstNum * secondNum);
            break;
        case '/':
            if (secondNum === 0) return null;
            result = String(firstNum / secondNum);

            break;
    }
    return result;
}

function calcString(srtArr) {

    let temp = [];
    let first = '';
    let operation = '';
    let second = '';
    let result = '';
    // calculate * and / operators
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === '/' || strArr[i] === '*') {
            first = temp.pop();
            operation = strArr[i];
            second = strArr[i+1];
            result = calcPair(first, operation, second); 
            if (result === null) {
                return null;
            } else {
                temp.push(result);
            }
            i++;            
        } else {
            temp.push(strArr[i]);
        }
    }

        // calculate + and - operators
        first = temp[0];
    for (let i = 1; i < temp.length; i += 2) {
            operation = temp[i];
            second = temp[i+1];
            first = calcPair(first, operation, second);
    }
    return first;
}

function checkBrackets(strArr) {
    let stack = 0;
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] == ')' && stack == 0) return false;
        if (strArr[i] == '(' || strArr[i] == ')') {
            strArr[i] == '(' ? stack++ : stack--;
        }
    }
    return stack == 0;
}

module.exports = {
    expressionCalculator
}