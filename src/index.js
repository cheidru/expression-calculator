function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here

    // let exprStr = expr.replace(/ /g,'');  // remove spaces
    let exprStr = expr.trim();
    let strArr = [];
    // strArr = exprStr.split(' '); // split string into letter array
    strArr = splitExpression(exprStr);
    let inBracketsResult = {}; // first: calculation result or null if division by zero , second: index position of end

    // check brackets pairing
    checkBrackets(strArr);

    let stack = [];

    for (let i = 0; i < strArr.length; i++) {

        if (strArr[i] == '(') { // calculate expression in brackets
            inBracketsResult = inBrackets(strArr, i);
            i = inBracketsResult.position // new index position after expression in brackets calculated
            stack.push(inBracketsResult.result);
        } else {
            stack.push(strArr[i])
        }
    }

    let cal = calcString(stack);

    return Number(cal);
}


function inBrackets(myArray, openBracketPosition) {
    let stack = [];
    let bracketCount = 1;
    let result = '';
    let inBracketsResult = {};
    for (let i = openBracketPosition + 1; i < myArray.length; i++) {
        if (myArray[i] == ')') {
            result = calcString(stack); 
            stack.push(result)
            bracketCount--
            
            if (bracketCount == 0) {
                inBracketsResult.position = i - 1;
                inBracketsResult.result = stack.pop;
                return inBracketsResult;
            }
        } else if (myArray[i] == '(') {
            inBracketResult = inBrackets(myArray, i);
            i = inBracketResult.position + 1;
            stack.push(inBracketResult.result);
            bracketCount++;
        } else {
            stack.push(myArray[i]);
        }
    }
}

function calcPair(first, operator, second) {
    
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
            if (secondNum === 0) {
                throw new TypeError("TypeError: Division by zero.");
            }
            result = String(firstNum / secondNum);
            break;
    }
    return result;
}

function calcString(myArray) {

    let temp = [];
    let first = '';
    let operation = '';
    let second = '';
    let result = '';

    // calculate * and / operators
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] == '/' || myArray[i] == '*') {
            first = temp.pop();
            operation = myArray[i];
            second = myArray[i+1];
            result = calcPair(first, operation, second); 
            temp.push(result);
            i++;            
        } else {
            temp.push(myArray[i]);
        }
    }

    if (temp.length == 1) {return temp.pop();}

        // calculate + and - operators
        first = temp[0];
    for (let i = 1; i < temp.length; i += 2) {
            operation = temp[i];
            second = temp[i+1];
            first = calcPair(first, operation, second);
    }
    return first;
}

function checkBrackets(myArray) {
    let stack = 0;
    for (let i = 0; i < myArray.length; i++) {
        if (myArray[i] == ')' && stack == 0) {
            throw new TypeError("ExpressionError: Brackets must be paired");
        }
        if (myArray[i] == '(' || myArray[i] == ')') {
            myArray[i] == '(' ? stack++ : stack--;
        }
    }

    if (stack != 0) {throw new TypeError("ExpressionError: Brackets must be paired");}
}

function splitExpression(expr) {
    let result = [];
    let i = 0;
    let j = 0;

    for (i ; i < expr.length; i++) {
        if (expr[i] !== " ") {

            if (expr[i] == "(" || expr[i] == ")" || expr[i] == "+" || expr[i] == "-" || expr[i] == "*" || expr[i] == "/") {
                result.push(expr[i]);

            } else {

                for (j = i ; j < expr.length; j++) {
                    if (expr[j] == "(" || expr[j] == ")" || expr[j] == "+" || expr[j] == "-" || expr[j] == "*" || expr[j] == "/" || expr[j] == " ") {
                        break;
                    }
                }
                result.push(expr.slice(i, j))
                i = j - 1;
            }
        }
    }
    return result;
}


module.exports = {
    expressionCalculator
}