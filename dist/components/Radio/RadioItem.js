import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import styles from './styles';
import variables from '../../common/styles/variables';
import styleUtils from '../../common/styles/utils';
import { FadeAnimated } from '../../common/animations';
export default class RadioItem extends Component {
    constructor(props) {
        super(props);
        this.handlePress = () => {
            if (this.props.disabled) {
                return;
            }
            const value = this.props.value;
            let checked = this.props.checked;
            // 已经选中了就直接返回
            if (checked === true) {
                return;
            }
            this.animated && this.animated.toIn();
            this.props.onChange && this.props.onChange(value);
        };
        this.renderIcon = (checked, iconPosition) => {
            const iconContainerStyle = {
                marginRight: iconPosition === 'left' ? 6 : null
            };
            const iconView = checked ? this.props.checkedIcon : this.props.uncheckedIcon;
            let animatedStyle = {};
            if (variables.radioEnableAnimated) {
                animatedStyle = {
                    transform: [{ scale: this.animated.getState().scale }],
                    opacity: this.animated.getState().opacity
                };
            }
            return (React.createElement(View, { style: iconContainerStyle },
                React.createElement(Animated.View, { style: animatedStyle }, iconView)));
        };
        this.renderLabel = (checked) => {
            return (React.createElement(Text, { style: [
                    styles.radioItemLabel,
                    checked ? [styleUtils.textPrimaryDark, styleUtils.textBold] : null
                ] }, this.props.label));
        };
        if (variables.radioEnableAnimated) {
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
    render() {
        const { testID, disabled, checked, iconPosition, style, renderItem } = this.props;
        return (React.createElement(TouchableOpacity, { testID: testID, style: [
                style,
                {
                    opacity: disabled ? variables.mtdOpacity : 1
                }
            ], activeOpacity: variables.mtdOpacity, onPress: this.handlePress }, typeof renderItem === 'function' ? renderItem(checked) :
            React.createElement(View, { style: [
                    styles.radioItemContainer,
                    this.props.iconPosition === 'right' ? {
                        flexDirection: 'row-reverse',
                        justifyContent: 'space-between'
                    } : null
                ] },
                this.renderIcon(checked, iconPosition),
                this.renderLabel(checked))));
    }
}
RadioItem.displayName = 'RadioItem';
RadioItem.defaultProps = {
    label: '选项',
    value: null,
    disabled: false,
    checked: false,
    iconPosition: 'right'
};
//# sourceMappingURL=RadioItem.js.map