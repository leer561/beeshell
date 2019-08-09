import React from 'react';
import { View, Text, Animated, } from 'react-native';
import { CheckboxItem } from './CheckboxItem';
import variables from '../../common/styles/variables';
import styles from './styles';
var ICON_POSITION;
(function (ICON_POSITION) {
    ICON_POSITION["LEFT"] = "left";
    ICON_POSITION["RIGHT"] = "right";
})(ICON_POSITION || (ICON_POSITION = {}));
export class CheckboxItemAllCheck extends CheckboxItem {
    constructor(props) {
        super(props);
        this.handlePress = () => {
            const { disabled, checkedStatus } = this.props;
            if (disabled) {
                return;
            }
            let tmp;
            if (checkedStatus === 1 || checkedStatus === 2) {
                tmp = 3;
            }
            if (checkedStatus === 3) {
                tmp = 1;
            }
            this.animated && this.animated.toIn();
            this.props.onChange && this.props.onChange(null, tmp, true);
        };
        this.renderIcon = () => {
            const { checkedIcon, checkedStatus, iconPosition, uncheckedIcon } = this.props;
            const styleArray = [];
            if (iconPosition === ICON_POSITION.LEFT) {
                styleArray.push(styles.iconLeftPosition);
            }
            let iconView = null;
            if (checkedStatus === 3) {
                iconView = checkedIcon;
            }
            else {
                // TODO 半选状态
                // if (checkedStatus === 2) {
                // }
                iconView = uncheckedIcon;
            }
            let animatedStyle = {};
            if (variables.radioEnableAnimated) {
                animatedStyle = {
                    transform: [{ scale: this.animated.getState().scale }],
                    opacity: this.animated.getState().opacity
                };
            }
            return (React.createElement(View, { style: styleArray },
                React.createElement(Animated.View, { style: animatedStyle }, iconView)));
        };
        this.state = {};
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.checkedStatus !== this.props.checkedStatus) {
            this.animated && this.animated.toIn();
        }
    }
    renderLabel() {
        const { label, checkedStatus } = this.props;
        return (React.createElement(Text, { style: [
                styles.checkboxLabel,
                (checkedStatus === 3) ? { color: variables.mtdBrandPrimaryDark, fontWeight: 'bold' } : null
            ] }, label));
    }
}
CheckboxItemAllCheck.defaultProps = {
    ...CheckboxItem.defaultProps,
    label: '全选',
    disabled: false,
    checkedStatus: 1,
    iconPosition: ICON_POSITION.LEFT,
    checkedIcon: null
};
//# sourceMappingURL=CheckboxItemAllCheck.js.map