const validators = {
	thumbnailSrc: {
		rules: [
			{
				test: (value) => value.length > 0,
				message: 'This field is required'
			}
		],
		errors: [],
		valid: false,
		state: '',
	},
	videoSrc: {
		rules: [
			{
				test: (value) => value.length > 0,
				message: 'This field is required'
			}
		],
		errors: [],
		valid: false,
		state: '',
	}
};

export default validators;
