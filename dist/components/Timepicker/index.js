import React from 'react';
import {Scrollpicker} from '../Scrollpicker';
import {range, convert2Digit} from '../../common/utils';

export class Timepicker extends React.Component {
	constructor(props) {
		super(props);
		this.input = ''
		this.handleChange = (columnIndex, rowIndex) => {
			const {list, value} = this.state;
			const tmpValue = value.concat();
			tmpValue.splice(columnIndex, 1, rowIndex);
			const ret = tmpValue.map((valueItem, valueIndex) => {
				return list[valueIndex][valueItem].value;
			});
			this.input = ret
			this.props.onChange && this.props.onChange(ret.join(':'));
		};
		this.state = {
			...this.init(props)
		};
	}

	init(props, input) {
		let {hourStep, minuteStep, secondStep, value, showTime, startTime, endTime, disableHours} = props;

		let removeHours = {}
		if (disableHours && disableHours.length) {
			disableHours.forEach(item => removeHours[item] = true)
		}
		// 获取最新的值
		if (input) {
			value = input
		} else {
			if (typeof (value) === 'string') {
				value = value.split(':')
			}

		}

		// 设置最大最小值
		const start = startTime.split(':')
		const end = endTime.split(':')
		let hourSum = Number(end[0]) + 1;
		let minuteSum = 60;
		let secondSum = 60;

		if (hourSum % hourStep !== 0) {
			throw TypeError(`hourStep 参数 ${hourStep} 无效`);
		}
		if (minuteSum % minuteStep !== 0) {
			throw TypeError(`minuteStep 参数 ${minuteStep} 无效`);
		}
		if (secondSum % secondStep !== 0) {
			throw TypeError(`secondStep 参数 ${secondStep} 无效`);
		}

		// 获取时间显示列数
		const show = showTime.split(':')

		const hoursList = range(hourSum / hourStep, start[0])
		// 过滤
		let hours = []
		hoursList.forEach((item) => {
			if (removeHours[item]) return;
			item = convert2Digit(item * hourStep);
			hours.push({
				label: `${item} 时`,
				value: item
			})
		});

		const list = [hours];
		let valueRet = [0];
		const showLength = show.length
		let minutes
		if (showLength >= 2) {
			if (value[0] == end[0]) {
				minuteSum = Number(end[1]) + 1
			}
			let startMinute = 0
			if (value[0] == start[0]) {
				startMinute = start[1]
			}
			minutes = range(minuteSum / minuteStep, startMinute).map((item) => {
				item = convert2Digit(item * minuteStep);
				return {
					label: `${item} 分`,
					value: item
				};
			});
			list.push(minutes)
			valueRet.push(0)
		}

		if (showLength >= 3) {
			if (value[0] == end[0] && value[1] == end[1]) {
				secondSum = Number(end[2]) + 1
			}
			let startSeconds = 0
			if (value[0] == start[0] && value[1] == start[1]) {
				startSeconds = start[2]
			}

			const seconds = range(secondSum / secondStep, startSeconds).map((item) => {
				item = convert2Digit(item * secondStep);
				return {
					label: `${item} 秒`,
					value: item
				};
			});
			list.push(seconds)
			valueRet.push(0)
		}

		if (value && value.length) {
			value.forEach((valueItem, valueIndex) => {
				if (!list[valueIndex]) return
				const tag = list[valueIndex].some((targetItem, targetIndex) => {
					if (targetItem.value === valueItem) {
						valueRet[valueIndex] = targetIndex;
						return true;
					} else {
						return false;
					}
				});
			});
		}
		const data = {
			value: valueRet,
			list
		};
		return data;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.setState({
				...this.state,
				...this.init(nextProps, this.input)
			});
		}
	}

	render() {
		const {value, list} = this.state
		return (
			<Scrollpicker
				{...this.props}
				value={value}
				list={list}
				onChange={this.handleChange}
			/>
		)
	}
}

Timepicker.defaultProps = {
	...Scrollpicker.defaultProps,
	hourStep: 1,
	minuteStep: 1,
	secondStep: 1,
	showTime: 'HH:mm:ss',
	startTime: '00:00:00',
	endTime: '23:59:59'
};
//# sourceMappingURL=index.js.map
