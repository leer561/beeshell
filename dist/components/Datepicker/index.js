import React from 'react';
import {range, isLeapYear, convert2Digit} from '../../common/utils';
import {noop} from '../../common/utils/fns';
import {Scrollpicker} from '../Scrollpicker';

export class Datepicker extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = (index1, index2) => {
			const {list, value} = this.state;
			let newList = [...list];
			let newValue = [...value];
			newValue[index1] = index2;
			let year;
			let month;
			let day;
			let days;
			if (index1 === 0) {
				year = list[index1][index2];
				month = list[1][value[1]];
			}
			if (index1 === 1) {
				year = list[0][value[0]];
				month = list[index1][index2];
			}
			if (index1 === 2) {
				year = list[0][value[0]];
				month = list[1][value[1]];
			}
			days = this.days ? this.days : this.getDays(year, month);
			newList[2] = days;
			day = list[2][value[2]];
			if (days.indexOf(day) === -1) {
				newValue[2] = days.length - 1;
			}
			this.setState({
				list: newList,
				value: newValue
			});
			const date = this.getDateByIndex(newList, newValue);
			this.props.onChange && this.props.onChange(date);
		};
		const data = this.initialize(props);
		this.state = {
			...data
		};
	}

	initialize(props) {
		let {startYear, numberOfYears, date, endDate, showPastDate} = props;

		// 当前年月日
		const d = new Date()
		const currentYear = d.getFullYear()
		const currentMonth = d.getMonth() + 1
		const currentDay = d.getUTCDate()

		let years = range(numberOfYears).map((item, index) => {
			return Number(startYear) + index;
		});
		let months = range(12).map(i => {
			return i + 1;
		});
		const input = this.getDateInputByString(date);
		if (!input) {
			date = new Date();
		} else {
			date = new Date(input[0], input[1], input[2]);
		}
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		let days = this.getDays(year, month);
		this.days = days

		// 如果是当前年份过滤掉之前月份
		if (year == currentYear && !showPastDate) {
			months = months.filter(month => month >= currentMonth)
			if (month == currentMonth) {
				days = days.filter(day => day >= currentDay)
				this.days = days
			}
		}

		// endDate调整截止时间
		if (endDate !== undefined) {
			const endDateArray = endDate.split('-')
			const [endYear, endMonth, endDay] = endDateArray
			years = years.filter(year => year <= endYear)
			// 判断月份是否跨年
			if (input && input[0] == endYear) {
				months = months.filter(month => month <= endMonth)
			}
			// 判断当前天数
			if (input && (input[1] + 1) == endMonth) {
				days = days.filter(day => day <= endDay)
				this.days = days
			}
		}
		const list = [years, months, days];
		const value = [
			years.indexOf(year),
			months.indexOf(month),
			days.indexOf(day)
		];
		return {
			list,
			value
		};
	}

	getDateInputByString(param) {
		if (!param) {
			return null;
		}
		let input = param.split('-');
		if (input.length !== 3) {
			return null;
		}
		input = input.map((item) => {
			return Number(item);
		});
		input[1] = input[1] - 1;
		const invalid = input.some((item) => {
			if (isNaN(item) || item < 0) {
				return true;
			}
		});
		if (invalid) {
			return null;
		}
		return input;
	}

	getDays(year, month) {
		year = parseInt(year, 10);
		month = parseInt(month, 10);
		let dayNum = 0;
		switch (month) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				dayNum = 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				dayNum = 30;
				break;
			case 2:
				dayNum = isLeapYear(year) ? 29 : 28;
				break;
		}
		const days = range(dayNum).map(i => {
			return i + 1;
		});
		return days;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.date !== this.props.date) {
			this.setState({
				...this.initialize(nextProps)
			});
		}
	}

	getViewList(list) {
		return list.map((item, index) => {
			let tmp = [];
			if (index === 0) {
				tmp = item.map(target => {
					return target + '年';
				});
			}
			if (index === 1) {
				tmp = item.map(target => {
					return target + '月';
				});
			}
			if (index === 2) {
				tmp = item.map(target => {
					return target + '日';
				});
			}
			return tmp;
		});
	}

	getDateByIndex(list, value) {
		const ret = list.map((item, index) => {
			return convert2Digit(item[value[index]]);
		});
		return ret.join('-');
	}

	render() {
		const {proportion} = this.props;
		const {list, value} = this.state;
		const viewList = this.getViewList(list);
		return (React.createElement(Scrollpicker, Object.assign({}, this.props, {
			list: viewList,
			value: value,
			onChange: this.handleChange
		})));
	}
}

Datepicker.defaultProps = {
	startYear: (new Date()).getFullYear(),
	numberOfYears: 10,
	date: 'undefined',
	onChange: noop,
	proportion: [2, 1, 1]
};
//# sourceMappingURL=index.js.map
