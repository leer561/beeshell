import React from 'react';
import { ScrollView, Animated } from 'react-native';
import { SlideModal } from '../../components/SlideModal';
import { Radio } from '../../components/Radio';
import dropdownStyles from './styles';
import variables from '../../common/styles/variables';
import { SlideAnimated } from '../../common/animations';
export class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.slideModal = null;
        this.animated = null;
        if (variables.dropdownEnableAnimated) {
            this.animated = new SlideAnimated({
                directionType: ['vertical'],
                duration: 1000,
                translateYList: [
                    props.direction === 'down' ? -20 : 20,
                    0,
                ]
            });
        }
    }
    open() {
        this.animated && this.animated.toIn();
        return this.slideModal.open();
    }
    close() {
        return this.slideModal.close();
    }
    getContent() {
        const { data, value, onChange, checkedIcon, uncheckedIcon } = this.props;
        let animatedStyle = {};
        if (this.animated) {
            animatedStyle = {
                transform: [
                    { translateX: this.animated.getState().translateX },
                    { translateY: this.animated.getState().translateY }
                ],
                opacity: this.animated.getState().opacity
            };
        }
        return (React.createElement(ScrollView, { style: [
                dropdownStyles.container,
                this.props.style
            ] },
            React.createElement(Animated.View, { style: animatedStyle },
                React.createElement(Radio, { checkedIcon: checkedIcon, uncheckedIcon: uncheckedIcon, value: value, onChange: (value) => {
                        this.slideModal.close();
                        onChange(value);
                    } }, data.map((item, index) => {
                    return (React.createElement(Radio.Item, { testID: item.testID, key: index, label: item.label, value: item.value }));
                })))));
    }
    render() {
        const { direction } = this.props;
        const fullScreenPatch = this.props.fullScreenPatch || (direction === 'down' ? [true, false, false] : [false, false, true]);
        return (React.createElement(SlideModal, { ref: c => {
                this.slideModal = c;
            }, fullScreenPatch: fullScreenPatch, direction: this.props.direction, offsetX: this.props.offsetX, offsetY: this.props.offsetY, cancelable: this.props.cancelable }, this.getContent()));
    }
}
Dropdown.defaultProps = {
    ...SlideModal.defaultProps,
    cancelable: false,
    direction: 'down',
    fullScreenPatch: null,
    data: []
};
//# sourceMappingURL=index.js.map