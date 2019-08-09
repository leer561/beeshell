import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import variables from '../../common/styles/variables';
import styles from './styles';
const stepperStyles = StyleSheet.create(styles);
export class Stepper extends Component {
    constructor(props) {
        super(props);
        this.textInputValue = '';
        this.onDecrease = () => {
            const { value, step, min } = this.props;
            const newValue = this.isEmpty(value) ? (min + step) : value;
            this.changeValue(newValue, -step, 'decrease');
        };
        this.onIncrease = () => {
            const { value, step, min } = this.props;
            const newValue = this.isEmpty(value) ? min - 1 : value;
            this.changeValue(newValue, step, 'increase');
        };
        this.onChangeText = (value) => {
            let newValue;
            if (!value) {
                newValue = '';
            }
            else {
                newValue = Number(value);
                if (isNaN(newValue)) {
                    newValue = '';
                }
            }
            this.changeValue(newValue, this.props.step, 'input');
        };
        this.changeValue = (value, step = 1, action) => {
            const { max, min } = this.props;
            let newValue;
            if (value === '') {
                newValue = '';
            }
            else {
                if (action === 'input') {
                    newValue = value;
                }
                else {
                    newValue = value + step;
                }
                if (newValue > max) {
                    newValue = max;
                }
                if (newValue < min) {
                    newValue = min;
                }
            }
            this.props.onChange && this.props.onChange(newValue, this.props.value, action);
        };
    }
    isEmpty(value) {
        return value == null || value === '';
    }
    render() {
        let { value, editable, style, operatorStyle, operatorIconColor, max, min } = this.props;
        let increasable;
        let decreasable;
        if (this.isEmpty(value)) {
            increasable = true;
            decreasable = true;
        }
        else {
            value = Number(value);
            if (isNaN(value)) {
                value = 0;
            }
            increasable = Boolean(value < max);
            decreasable = Boolean(value > min);
        }
        let textInputValue = this.isEmpty(value) ? '' : String(value);
        if (textInputValue === this.textInputValue) {
            textInputValue += ' ';
            this.textInputValue = textInputValue;
        }
        else {
            this.textInputValue = textInputValue;
        }
        return (React.createElement(View, { style: [stepperStyles.container, style] },
            React.createElement(TouchableOpacity, { activeOpacity: variables.mtdOpacity, onPress: this.onDecrease, disabled: !decreasable },
                React.createElement(View, { style: [
                        stepperStyles.ctrl,
                        operatorStyle,
                        !decreasable ? stepperStyles.disabled : null
                    ] },
                    React.createElement(View, { style: [
                            stepperStyles.ctrlSymbolHor,
                            { backgroundColor: operatorIconColor }
                        ] }))),
            React.createElement(TextInput, { style: [
                    stepperStyles.input,
                ], value: textInputValue, onChangeText: this.onChangeText, editable: editable, keyboardType: 'numeric' }),
            React.createElement(TouchableOpacity, { activeOpacity: variables.mtdOpacity, onPress: this.onIncrease, disabled: !increasable },
                React.createElement(View, { style: [
                        stepperStyles.ctrl,
                        operatorStyle,
                        !increasable ? stepperStyles.disabled : null
                    ] },
                    React.createElement(View, { style: [
                            stepperStyles.ctrlSymbolHor,
                            {
                                backgroundColor: operatorIconColor
                            }
                        ] }),
                    React.createElement(View, { style: [
                            stepperStyles.ctrlSymboVer,
                            {
                                backgroundColor: operatorIconColor
                            }
                        ] })))));
    }
}
Stepper.defaultProps = {
    operatorIconColor: variables.mtdGrayDarker,
    min: 1,
    max: 5,
    step: 1,
    editable: false
};
//# sourceMappingURL=index.js.map