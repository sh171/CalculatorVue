var vm = new Vue({
	el: "#app",
	data: {
		input: "",
		isResult: false,
	},

	methods: {
		clear() {
			this.input = '';
			this.isResult = false;
		},
		calc() {
			if (this.input != "") {
				total = expressionParser(this.input);
				this.input = total;
				this.isResult = true;
			}
		},
		append(value) {
			if (this.isResult) {
				this.input = "";
				this.isResult = false;
			}
			this.input += value;
		}
	}
})

function expressionParser(expression) {
	let nums = [];
	let ops = [];

	for (let i=0; i<expression.length; i++) {
		// Processing when numbers and . come
		if (!isNaN(expression[i]) || expression[i]==".") {
			let numbers = "";
			while (i<expression.length && !isNaN(expression[i]) || expression[i]==".") {
				numbers += expression[i];
				i++;
			}
			nums.push(numbers);
			i--;
		}
		// Processing when an operator comes
		else {
			while (ops.length > 0 && getPriority(expression[i]) <= getPriority(ops[ops.length - 1])) {
				process(nums, ops.pop());
			}
			ops.push(expression[i]);
		}
	}
	
	// Calculate until ops(stack) is empty
	while (ops.length > 0) {
		process(nums, ops.pop());
	}

	return nums[0];
}

// Calculation
function process(nums, op) {
	let right = Number(nums.pop());
	let left = Number(nums.pop());
	let res = 0;

	if (op == "*") res = left * right;
	else if (op == "/") res = left / right;
	else if (op == "+") res = left + right;
	else if (op == "-") res = left - right;

	nums.push(res);
}

// Check the order of operations
function getPriority(op) {
	if (op == "*" || op == "/") return 2;
	else if (op == "+" || op == "-") return 1;
}