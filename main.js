var vm = new Vue({
	el: "#app",
	data: {
		input: "",
	},

	methods: {
		clear() {
			this.input = '';
		},
		calc() {
			total = expressionParser(this.input);		
		}
	}
})

function expressionParser(expression) {
	let nums = [];
	let ops = [];

	for (let i=0; i<expression.length; i++) {
		if (!isNaN(expression[i]) || expression[i]==".") {
			// console.log(`Number: ${expression[i]}`);
			let numbers = "";
			while (i<expression.length && !isNaN(expression[i]) || expression[i]==".") {
				numbers += expression[i];
				i++;
			}
			nums.push(numbers);
			console.log(nums);
			i--;
		}
		else {
			// console.log(`Not Number: ${expression[i]}`);
			while (ops.length > 0 && getPriority(expression[i]) <= getPriority(ops[ops.length - 1])) {
				process(nums, ops.pop());
			}
			ops.push(expression[i]);
			console.log(ops);
		}
	}
}

function process(nums, op) {
	let right = parseInt(nums.pop());
	let left = parseInt(nums.pop());
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