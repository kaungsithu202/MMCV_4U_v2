import moment from 'moment';

export const days = Array.from({ length: 31 }, (_, index) => {
	const day = index + 1;
	return day.toString();
});

// export const months = (() => {
// 	const months = [];
// 	for (let i = 0; i < 12; i++) {
// 		const monthName = new Date(2023, i, 1).toLocaleString('en-US', {
// 			month: 'long',
// 		});
// 		months.push(monthName);
// 	}

// 	return months;
// })();

export const getMonths = () => {
	return moment.months();
};

export const lastHundredYears = (() => {
	const currentYear = new Date().getFullYear();
	const years = [];

	for (let i = currentYear; i > currentYear - 100; i--) {
		years.push(i);
	}

	return years;
})();
