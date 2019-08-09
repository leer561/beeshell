import React, { Component } from 'react';
import { StyleSheet, View, PanResponder } from 'react-native';
import { Icon } from '../Icon';
import styles from './styles';
import variables from '../../common/styles/variables';
const rateStyles = StyleSheet.create(styles);
export class Rate extends Component {
    constructor(props) {
        super(props);
        this.panResponder = null;
        this.containerView = null;
        this.createPanResponder();
    }
    validateProps(props) {
        const { value } = props;
        let tmpValue = value == null ? 0 : value;
        tmpValue = Number(tmpValue);
        if (isNaN(tmpValue)) {
            throw Error('Rate 组件请提供有效的 value 参数');
        }
        const integer = parseInt(tmpValue, 10);
        if (tmpValue - integer !== 0 && tmpValue - integer !== 0.5) {
            throw Error('Rate 组件请提供有效的 value 参数');
        }
    }
    render() {
        this.validateProps(this.props);
        return (React.createElement(View, { ref: c => { this.containerView = c; }, style: [rateStyles.wrapper, this.props.style], collapsable: false },
            React.createElement(View, Object.assign({ collapsable: false, style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 } }, this.panResponder.panHandlers)),
            this.renderIcons(this.props.value)));
    }
    renderIcons(value) {
        const { icons: { half, full, empty }, total, iconSpace, iconSize, iconColor } = this.props;
        const ret = [];
        for (let i = 0; i < total; i++) {
            const marginRight = i === total - 1 ? 0 : iconSpace;
            if (half &&
                value > i &&
                value < i + 1) {
                const tmpProps = { ...half.props, key: i, style: [{ marginRight }, half.props.style] };
                if (half && half.type && half.type.displayName === 'Icon') {
                    tmpProps.size = iconSize;
                    tmpProps.tintColor = iconColor;
                }
                ret.push(React.cloneElement(half, tmpProps));
            }
            else if (value >= i + 1) {
                const tmpProps = { ...full.props, key: i, style: [{ marginRight }, full.props.style] };
                if (full && full.type && full.type.displayName === 'Icon') {
                    tmpProps.size = iconSize;
                    tmpProps.tintColor = iconColor;
                }
                ret.push(React.cloneElement(full, tmpProps));
            }
            else {
                const tmpProps = { ...empty.props, key: i, style: [{ marginRight }, empty.props.style] };
                if (empty && empty.type && empty.type.displayName === 'Icon') {
                    tmpProps.size = iconSize;
                    tmpProps.tintColor = iconColor;
                }
                ret.push(React.cloneElement(empty, tmpProps));
            }
        }
        return ret;
    }
    getValue(pageX) {
        const p = new Promise((resolve) => {
            this.containerView && this.containerView.measure((ox, oy, width, height, px, py) => {
                resolve(px);
            });
        });
        return p.then((containerViewX) => {
            const { iconSize, iconSpace, total, enableHalf } = this.props;
            const locationX = pageX - containerViewX;
            // console.log(pageX, containerViewX)
            if (locationX <= 0) {
                return 0;
            }
            const unitWidth = iconSize + iconSpace;
            let value = Math.floor(locationX / unitWidth);
            if (value >= total) {
                return total;
            }
            const rest = locationX - unitWidth * value;
            if (rest > 0 && rest < (iconSize / 2)) {
                if (!enableHalf) {
                    value = value + 1;
                }
                else {
                    value = value + 0.5;
                }
            }
            if (rest > (iconSize / 2)) {
                value = value + 1;
            }
            return value;
        });
    }
    handleChange(value) {
        this.props.onChange && this.props.onChange(value);
    }
    createPanResponder() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (event, gesture) => {
                this.getValue(event.nativeEvent.pageX).then((value) => {
                    this.handleChange(value);
                });
            },
            onPanResponderMove: (event, gesture) => {
                this.getValue(event.nativeEvent.pageX).then((value) => {
                    this.handleChange(value);
                });
            },
            onPanResponderRelease: event => {
            },
        });
    }
}
Rate.defaultProps = {
    total: 5,
    icons: {
        empty: React.createElement(Icon, { source: require(`../../common/images/icons/star-o.png`) }),
        full: React.createElement(Icon, { source: require(`../../common/images/icons/star.png`) }),
        half: React.createElement(Icon, { source: require(`../../common/images/icons/star-half-o.png`) })
    },
    iconSize: 20,
    iconSpace: 4,
    enableHalf: true,
    iconColor: variables.mtdBrandPrimaryDark
};
//# sourceMappingURL=index.js.map