module.exports = function zeros(expression) {
  // your solution
	var expressions = expression.split("*");
	var factorials = [];
	  
	for (var i = 0; i < expressions.length; i++) {
		factorials[i] = calculateAllFactorials(expressions[i]);
	}

	var result = factorials.reduce(multiply);
	var count = 0;
	var zero = result.length-1;
	while (result[zero] == '0') {
		count++;
		zero--;
	}

	return count;
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

function calculateAllFactorials(str) {
	var iterations = str.split("!");
	var result = iterations[0];
	for (var i = 1; i <= iterations.length-1; i++) {
		result = calculateFactorial(result);
	}
	return result;
}

function calculateFactorial(str) {
	var currentNumber = 1;
	var result = 1;
	while (currentNumber <= str) {
		result = multiply(String(currentNumber), String(result));
		currentNumber++;
	}
	return result;
}
