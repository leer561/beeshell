import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import moment from 'moment';
import calendarUtils from './utils';
import variables from '../../common/styles/variables';
const styles = StyleSheet.create({
    container: {
        paddingVertical: variables.mtdVSpacingX4L,
        backgroundColor: '#fff',
    },
    header: {
        paddingBottom: variables.mtdVSpacingX2L,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 3,
        paddingHorizontal: variables.mtdHSpacingXL,
        textAlign: 'center',
        fontSize: variables.mtdFontSizeL,
        color: variables.mtdGrayBase,
    },
    operatorWrapper: {
        flex: 1,
        paddingHorizontal: variables.mtdHSpacingXL
    },
    operator: {
        textAlign: 'center',
        fontSize: variables.mtdFontSizeL,
        color: variables.mtdGrayBase,
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    gridItem: {
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemInner: {
        fontSize: variables.mtdFontSizeL,
        color: variables.mtdGrayBase,
    },
    dotIndicator: {
        position: 'absolute',
        bottom: -6,
        width: 4,
        height: 4,
        borderRadius: 4,
        backgroundColor: variables.mtdGrayLight,
    }
});
export class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.selectDate = (viewDate) => {
            if (viewDate.disabled) {
                return;
            }
            this.setState({
                date: viewDate.dateModel,
                selectedDate: viewDate.dateModel,
            });
            const dateString = viewDate.dateModel.format(this.props.format);
            this.props.onChange && this.props.onChange(dateString);
        };
        this.renderHeader = () => {
            const { date } = this.state;
            return (React.createElement(View, { style: styles.header },
                React.createElement(View, { style: styles.operatorWrapper },
                    React.createElement(TouchableOpacity, { onPress: this.changeDate.bind(this, 'years', 'subtract') },
                        React.createElement(Text, { style: [styles.operator, { textAlign: 'left' }], numberOfLines: 1 }, "<<"))),
                React.createElement(View, { style: styles.operatorWrapper },
                    React.createElement(TouchableOpacity, { onPress: this.changeDate.bind(this, 'months', 'subtract') },
                        React.createElement(Text, { style: styles.operator }, "<"))),
                React.createElement(Text, { style: styles.title, numberOfLines: 1 }, date.format('YYYY-MM-DD')),
                React.createElement(View, { style: styles.operatorWrapper },
                    React.createElement(TouchableOpacity, { onPress: this.changeDate.bind(this, 'months', 'add') },
                        React.createElement(Text, { style: styles.operator }, ">"))),
                React.createElement(View, { style: styles.operatorWrapper },
                    React.createElement(TouchableOpacity, { onPress: this.changeDate.bind(this, 'years', 'add') },
                        React.createElement(Text, { style: [styles.operator, { textAlign: 'right' }], numberOfLines: 1 }, ">>")))));
        };
        this.renderWeekDay = (item, index) => {
            return (React.createElement(View, { style: styles.gridItemWrapper, key: index },
                React.createElement(Text, { style: {} }, item)));
        };
        moment.locale(this.props.locale);
        this.state = {
            ...this.init(this.props)
        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        const keys = ['date', 'startDate', 'endDate'];
        const propsChanged = keys.some((key) => {
            if (nextProps[key] !== this.props[key]) {
                return true;
            }
        });
        if (propsChanged) {
            this.setState({
                ...this.init(nextProps)
            });
        }
    }
    init(props) {
        let { date, startDate, endDate } = props;
        date = moment(date);
        if (!date.isValid()) {
            date = moment();
        }
        startDate = moment(startDate);
        if (!startDate.isValid()) {
            startDate = null;
        }
        endDate = moment(endDate);
        if (!endDate.isValid()) {
            endDate = null;
        }
        return {
            date,
            selectedDate: date,
            startDate,
            endDate
        };
    }
    changeDate(type, method) {
        const { date } = this.state;
        this.setState({
            date: calendarUtils.changeDate(date, type, method)
        });
    }
    isTargetMonth(item) {
        const { date } = this.state;
        if (!date.isSame(item.dateModel, 'month')) {
            return false;
        }
        else {
            return true;
        }
    }
    isDisabled(item) {
        const { startDate, endDate } = this.state;
        if ((startDate && item.dateModel.isBefore(startDate)) ||
            (endDate && item.dateModel.isAfter(endDate))) {
            return true;
        }
        else {
            return false;
        }
    }
    renderItem(item, date, desc) {
        return (React.createElement(View, { style: [
                styles.gridItem,
                {
                    backgroundColor: desc.selected ? variables.mtdBrandPrimary : (desc.today ? variables.mtdFillBody : null)
                }
            ] },
            React.createElement(Text, { style: [
                    styles.gridItemInner,
                    {
                        color: desc.disabled ? variables.mtdGrayLightest : (desc.targetMonth ? variables.mtdGrayBase : variables.mtdGrayLight),
                        fontWeight: desc.selected ? 'bold' : null,
                    },
                ] }, item.dateModel.format('DD')),
            desc.selected || desc.today ? React.createElement(View, { style: styles.dotIndicator }) : null));
    }
    render() {
        const { date, startDate, endDate } = this.state;
        let calendar = calendarUtils.getCalendar(date);
        const weekdays = calendarUtils.getWeekdays(calendar);
        return (React.createElement(View, { style: [styles.container, this.props.style] },
            this.renderHeader(),
            React.createElement(View, null,
                React.createElement(View, { style: styles.gridRow }, weekdays.map(this.renderWeekDay)),
                React.createElement(View, null, calendar.map((week, i) => {
                    return (React.createElement(View, { key: i, style: styles.gridRow }, week.map((item, index) => {
                        const desc = {};
                        desc.targetMonth = this.isTargetMonth(item);
                        desc.disabled = this.isDisabled(item);
                        desc.today = item.dateModel.isSame(moment(), 'day');
                        desc.selected = item.dateModel.isSame(this.state.selectedDate);
                        return (React.createElement(View, { key: index, style: [
                                styles.gridItemWrapper
                            ] },
                            React.createElement(TouchableOpacity, { onPress: () => {
                                    if (desc.disabled) {
                                        return;
                                    }
                                    this.selectDate(item);
                                } }, this.props.renderItem ? this.props.renderItem(item, date, desc) : this.renderItem(item, date, desc))));
                    })));
                })))));
    }
}
Calendar.defaultProps = {
    style: {},
    locale: 'zh-cn',
    format: 'YYYY-MM-DD',
    date: '',
    startDate: '',
    endDate: '',
    renderItem: null,
};
//# sourceMappingURL=index.js.map