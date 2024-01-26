var vm = new Vue({
	el: "#app",
	data: {
		input: "",
	},

	methods: {
		clear() {
			this.input = '';
		}
	}
})