import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '../Icon';
import navigationBarStyles from './styles';
import variables from '../../common/styles/variables';
export class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }
    renderItem(index) {
        const { backLabel, backLabelIcon, backLabelText, backLabelTextStyle, onPressBack, titleContainer, title, titleStyle, forwardLabel, forwardLabelText, forwardLabelTextStyle, onPressForward } = this.props;
        const fontSize = variables.mtdFontSizeL;
        const fontColor = variables.mtdGrayBase;
        if (index === 0) {
            return (React.createElement(TouchableOpacity, { testID: 'back', style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: variables.mtdVSpacingXL,
                    paddingHorizontal: variables.mtdHSpacingXL
                }, onPress: () => {
                    onPressBack && onPressBack();
                } }, React.isValidElement(backLabel) ? backLabel :
                React.createElement(View, { style: {
                        flexDirection: 'row',
                        minWidth: 30,
                        alignItems: 'center'
                    } },
                    React.isValidElement(backLabelIcon) ? backLabelIcon :
                        React.createElement(Icon, { source: require(`../../common/images/icons/angle-left.png`), size: fontSize, tintColor: fontColor }),
                    React.createElement(Text, { style: [
                            {
                                fontSize,
                                color: fontColor
                            },
                            backLabelTextStyle
                        ] }, backLabelText))));
        }
        if (index === 1) {
            return (React.createElement(View, { style: {
                    paddingVertical: variables.mtdVSpacingXL,
                    paddingHorizontal: variables.mtdHSpacingXL
                } }, React.isValidElement(titleContainer) ? titleContainer : React.createElement(Text, { style: [{ textAlign: 'center', fontSize, color: fontColor }, titleStyle] }, title)));
        }
        if (index === 2) {
            return (React.createElement(TouchableOpacity, { testID: 'forward', style: {
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingVertical: variables.mtdVSpacingXL,
                    paddingHorizontal: variables.mtdHSpacingXL
                }, onPress: () => {
                    onPressForward && onPressForward();
                } }, React.isValidElement(forwardLabel) ? forwardLabel :
                React.createElement(Text, { style: [
                        {
                            fontSize,
                            color: fontColor
                        },
                        forwardLabelTextStyle
                    ] }, forwardLabelText)));
        }
    }
    render() {
        const { testID, style, proportion, renderItem } = this.props;
        return (React.createElement(View, { testID: testID, style: [navigationBarStyles.wrapper, style] }, proportion.map((item, index) => {
            return (React.createElement(View, { key: index, style: { flex: item } }, renderItem ? renderItem(index) : this.renderItem(index)));
        })));
    }
}
NavigationBar.defaultProps = {
    style: {},
    proportion: [1, 2, 1],
    title: '标题',
    titleStyle: {},
    backLabelText: '返回',
    onPressBack: null,
    forwardLabelText: null,
    onPressForward: null,
    renderItem: null
};
//# sourceMappingURL=index.js.map