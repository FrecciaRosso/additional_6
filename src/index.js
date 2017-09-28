module.exports = function zeros(expression) {
  // your solution
	var fragments = expression.split("*");
    var countZeros = [];
    for (var i = 0; i < fragments.length; i++) {
        countZeros = countZeros.concat(countZerosInFragment(fragments[i]));
    }

    var result = countZeros[0];
    for (var i = 1; i < countZeros.length; i++) {
        result = multiply(String(countZeros[i]), String(result));
    }

    var count = "";
    var pos = result.length-1;
    while(result[pos] == '0' && pos > 0) {
        pos--;
        count += "0";
    }

    return count.length;
}

function countZerosInFragment(fragment) {
    var items = fragment.split("!");
    var number = items[0];
    var stepSize = items.length-1;
    var start = (number % 2 == 0) ? 2 : 1;
    var arr = [start];

    while (start < number) {
        start += stepSize;
        arr.push(start);
    }

    return arr;
}

function multiply(first, second) {
    var reversed1 = first.split('').reverse();
    var reversed2 = second.split('').reverse();
    var calculationMatrix = [];
    for (var i = 0; i < reversed1.length + reversed2.length + 1; i++) {
        calculationMatrix[i] = '0';
    }
    for (var i = 0; i < reversed2.length; i++) {
        var digit2 = parseInt(reversed2[i]);
        var caret = 0;
        for (var j = 0; j < reversed1.length; j++) {
            var digit1 = parseInt(reversed1[j]);
            var temp = parseInt(calculationMatrix[i + j]);
            var current = digit1 * digit2 + temp + caret;
            calculationMatrix[i + j] = current % 10 + '';
            caret = parseInt(current / 10);
        }
        calculationMatrix[i + reversed1.length] = caret + '';
    }
    var result = calculationMatrix.reverse().join("");
    var pos = 0;
    while(result.charAt(pos) == '0' && pos < result.length) {
        pos++;
    }
    return result.substring(pos);
}