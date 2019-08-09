import React, { Component } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import styles from './styles';
const progressStyles = StyleSheet.create(styles);
export class Progress extends Component {
    constructor(props) {
        super(props);
        this.onLayout = (e) => {
            if (this.state.wrapperWidth == null) {
                // console.log('onLayout: ', e.nativeEvent.layout.width)
                this.setState({
                    wrapperWidth: e.nativeEvent.layout.width
                }, () => {
                    if (this.props.easing) {
                        this.toAnimate(this.state.barWidth, 0, this.getWidthByPercent(this.state.wrapperWidth, this.props.percent), this.props.duration);
                    }
                });
            }
        };
        this.state = {
            wrapperWidth: null,
            barWidth: new Animated.Value(0)
        };
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.easing &&
            nextProps.percent !== this.props.percent) {
            this.toAnimate(this.state.barWidth, this.getWidthByPercent(this.state.wrapperWidth, this.props.percent), this.getWidthByPercent(this.state.wrapperWidth, nextProps.percent), this.props.duration);
        }
    }
    normalPercent(percent) {
        let ret = 0;
        if (percent != null && percent > 0) {
            ret = percent > 100 ? 100 : percent;
        }
        return ret;
    }
    getWidthByPercent(baseWidth, percent) {
        return baseWidth * (this.normalPercent(percent) / 100);
    }
    toAnimate(target, fromValue, toValue, duration) {
        target.setValue(fromValue);
        Animated.timing(target, {
            toValue,
            duration: duration
        }).start();
    }
    render() {
        const { style, barStyle, easing, percent } = this.props;
        const { wrapperWidth, barWidth } = this.state;
        let percentStyle;
        if (wrapperWidth == null) {
            percentStyle = {};
        }
        else {
            percentStyle = easing ? {
                width: barWidth
            } : {
                width: this.getWidthByPercent(wrapperWidth, percent)
            };
        }
        return (React.createElement(View, { style: [progressStyles.wrapper, style], onLayout: this.onLayout }, wrapperWidth == null ? null : (easing ? (React.createElement(Animated.View, { style: [progressStyles.progressBar, barStyle, percentStyle] })) : (React.createElement(View, { style: [progressStyles.progressBar, barStyle, percentStyle] })))));
    }
}
Progress.defaultProps = {
    style: {},
    barStyle: {},
    percent: 0,
    easing: true,
    duration: 300
};
//# sourceMappingURL=index.js.map