function convertDate(date) {
		const isoDate = new Date(date);
		return new Intl.DateTimeFormat('en-US').format(isoDate);
}

export {
	convertDate,
}
