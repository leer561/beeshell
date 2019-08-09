import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import checkboxItemStyle from './styles';
import variables from '../../common/styles/variables';
import { FadeAnimated } from '../../common/animations';
const styles = StyleSheet.create(checkboxItemStyle);
var ICON_POSITION;
(function (ICON_POSITION) {
    ICON_POSITION["LEFT"] = "left";
    ICON_POSITION["RIGHT"] = "right";
})(ICON_POSITION || (ICON_POSITION = {}));
export class CheckboxItem extends Component {
    constructor(props) {
        super(props);
        this.handlePress = () => {
            const { disabled, checked, value } = this.props;
            if (this.props.disabled) {
                return;
            }
            this.animated && this.animated.toIn();
            this.props.onChange && this.props.onChange(value, !checked);
        };
        this.renderIcon = () => {
            const { checked, iconPosition, checkedIcon, uncheckedIcon } = this.props;
            const styleArray = [];
            if (iconPosition === ICON_POSITION.LEFT) {
                styleArray.push(styles.iconLeftPosition);
            }
            const iconView = checked ? checkedIcon : uncheckedIcon;
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
        if (variables.checkboxEnableAnimated) {
            this.animated = new FadeAnimated({});
        }
    }
    componentDidMount() {
        this.animated && this.animated.toIn();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.props.checked) {
            this.animated && this.animated.toIn();
        }
    }
    renderLabel() {
        const { label, checked } = this.props;
        return (React.createElement(Text, { style: [
                styles.checkboxLabel,
                checked ? { color: variables.mtdBrandPrimaryDark, fontWeight: 'bold' } : null
            ] }, label));
    }
    render() {
        const { style, disabled, iconPosition, checked, renderItem } = this.props;
        return (React.createElement(TouchableOpacity, { style: [
                {
                    opacity: disabled ? variables.mtdOpacity : 1
                }
            ], onPress: this.handlePress, activeOpacity: variables.mtdOpacity }, typeof renderItem === 'function' ? renderItem(checked) :
            React.createElement(View, { style: [
                    styles.checkboxItemContainer,
                    style,
                    iconPosition === ICON_POSITION.RIGHT ? { flexDirection: 'row-reverse', justifyContent: 'space-between' } : null
                ] },
                this.renderIcon(),
                this.renderLabel())));
    }
}
CheckboxItem.displayName = 'CheckboxItem';
CheckboxItem.defaultProps = {
    style: {},
    label: '选项',
    value: null,
    disabled: false,
    checked: false,
    iconPosition: ICON_POSITION.LEFT,
    checkedIcon: null
};
//# sourceMappingURL=CheckboxItem.js.map