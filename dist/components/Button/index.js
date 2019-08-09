import React from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
import buttonStyles from './styles';
export { buttonStyles };
import variables from '../../common/styles/variables';
import { FadeAnimated } from '../../common/animations';
const fontSizeMap = {
    lg: variables.buttonLFontSize,
    md: variables.buttonMFontSize,
    sm: variables.buttonSFontSize
};
const paddingMap = {
    lg: {
        paddingHorizontal: variables.buttonLHSpacing,
        paddingVertical: variables.buttonLVSpacing
    },
    md: {
        paddingHorizontal: variables.buttonMHSpacing,
        paddingVertical: variables.buttonMVSpacing
    },
    sm: {
        paddingHorizontal: variables.buttonSHSpacing,
        paddingVertical: variables.buttonSVSpacing
    }
};
export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = null;
        this.animated = null;
        this.handleLayout = (e) => {
            const { width } = e.nativeEvent.layout;
            this.setState({
                buttonWidth: width
            });
        };
        this.state = {
            buttonWidth: 0,
        };
        if (variables.buttonEnableAnimated) {
            this.animated = new FadeAnimated({
                scaleList: [0, 1],
                opacityList: [1, 0],
                opacityDuration: 1000,
            });
        }
    }
    componentDidMount() {
    }
    measure(...args) {
        this.containerRef.measure.apply(null, args);
    }
    handlePress() {
        const { disabled, onPress } = this.props;
        if (disabled) {
            return;
        }
        this.animated && this.animated.toIn();
        if (typeof onPress === 'function') {
            onPress();
        }
    }
    render() {
        const { type, disabled, style, textStyle, size, children, textColorInverse, testID } = this.props;
        const styleWrapper = buttonStyles[type + 'Wrapper'] || buttonStyles.defaultWrapper;
        const styleText = buttonStyles[type + 'Text'] || buttonStyles.defaultText;
        const inverseStyle = textColorInverse && type !== 'default' && type !== 'text' ? { color: variables.mtdGrayBase } : {};
        let animatedStyle = {};
        if (this.animated) {
            animatedStyle = {
                transform: [{ scale: this.animated.getState().scale }],
                opacity: this.animated.getState().opacity
            };
        }
        return (React.createElement(TouchableOpacity, { testID: testID, ref: c => (this.containerRef = c), style: [
                styleWrapper,
                {
                    opacity: disabled ? variables.buttonActiveOpacity : 1,
                    ...(paddingMap[size] || paddingMap['md'])
                },
                style
            ], disabled: disabled, onPress: () => this.handlePress(), activeOpacity: disabled ? 1 : variables.buttonActiveOpacity, onLayout: this.handleLayout },
            React.isValidElement(children) ? children : (React.createElement(Text, { style: [
                    styleText,
                    {
                        fontSize: fontSizeMap[size] || fontSizeMap['md']
                    },
                    inverseStyle,
                    textStyle
                ] }, children)),
            React.createElement(Animated.View, { style: [
                    {
                        position: 'absolute',
                        zIndex: -1,
                        width: this.state.buttonWidth,
                        height: this.state.buttonWidth,
                        borderRadius: this.state.buttonWidth,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        opacity: 0,
                    },
                    animatedStyle
                ] })));
    }
}
Button.defaultProps = {
    style: {},
    textStyle: {},
    textColorInverse: false,
    type: 'default',
    size: 'md',
    disabled: false,
    onPress: null,
};
//# sourceMappingURL=index.js.map