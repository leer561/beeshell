import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { SlideModal } from '../SlideModal';
import styleUtils from '../../common/styles/utils';
import bottomModalStyles from './styles';
const window = Dimensions.get('window');
export class BottomModal extends SlideModal {
    constructor(props) {
        super(props);
    }
    getHeader() {
        const styles = bottomModalStyles;
        const { titleContainer, title, titleStyle, rightLabel, rightLabelText, rightLabelTextStyle, rightCallback, leftLabel, leftLabelText, leftLabelTextStyle, leftCallback } = this.props;
        let rightEl = null;
        if (rightLabel || rightLabelText) {
            rightEl = (React.createElement(TouchableOpacity, { testID: 'right', activeOpacity: 1, onPress: () => {
                    this.close().then(() => {
                        rightCallback && rightCallback();
                    });
                } }, React.isValidElement(rightLabel) ? rightLabel :
                React.createElement(Text, { style: [
                        styles.operator,
                        styleUtils.textRight,
                        styleUtils.textPrimaryDark,
                        styleUtils.textBold,
                        rightLabelTextStyle
                    ], numberOfLines: 1 }, rightLabelText)));
        }
        let leftEl = null;
        if (leftLabel || leftLabelText) {
            leftEl = (React.createElement(TouchableOpacity, { testID: 'left', activeOpacity: 1, onPress: () => {
                    this.close().then(() => {
                        leftCallback && leftCallback();
                    });
                } }, React.isValidElement(leftLabel) ? leftLabel :
                React.createElement(Text, { style: [styles.operator, styleUtils.textLeft, leftLabelTextStyle], numberOfLines: 1 }, leftLabelText)));
        }
        let titleContainerEl = null;
        if (titleContainer || title) {
            titleContainerEl = React.isValidElement(titleContainer) ? titleContainer : (React.createElement(Text, { style: [styles.title, titleStyle] }, title));
        }
        return (React.createElement(View, { style: styles.header },
            React.createElement(View, { style: styles.colSide }, leftEl),
            React.createElement(View, { style: styles.colMiddle }, titleContainerEl),
            React.createElement(View, { style: styles.colSide }, rightEl)));
    }
    getBody() {
        return this.props.children;
    }
    getContent() {
        const styles = bottomModalStyles;
        const inner = (React.createElement(View, { testID: this.props.testID, style: [styles.container, { width: this.props.screenWidth }, this.props.style] },
            this.getHeader(),
            this.getBody()));
        return SlideModal.prototype.getContent.call(this, inner);
    }
}
BottomModal.defaultProps = {
    ...SlideModal.defaultProps,
    cancelable: true,
    screenWidth: window.width,
    titleContainer: null,
    title: '标题',
    titleStyle: {},
    rightLabel: null,
    rightLabelText: '完成',
    rightLabelTextStyle: {},
    rightCallback: null,
    leftLabel: null,
    leftLabelText: '取消',
    leftLabelTextStyle: {},
    leftCallback: null,
};
//# sourceMappingURL=index.js.map