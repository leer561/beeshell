import React from 'react';
import { View, Text, TouchableOpacity, PixelRatio } from 'react-native';
import { Modal } from '../Modal';
import dialogStyles from './styles';
import variables from '../../common/styles/variables';
const px = 1 / PixelRatio.get();
export class Dialog extends Modal {
    constructor(props) {
        super(props);
    }
    getContent() {
        const styles = dialogStyles;
        const inner = (React.createElement(View, { style: styles.container },
            this.getHeader(),
            this.getBody(),
            this.getFooter()));
        return Modal.prototype.getContent.call(this, inner);
    }
    getHeader() {
        const { header, title, titleStyle } = this.props;
        if (header && React.isValidElement(header)) {
            return header;
        }
        return (React.createElement(View, { style: dialogStyles.header },
            React.createElement(Text, { style: [dialogStyles.title, titleStyle] }, title)));
    }
    getBody() {
        const { body, bodyText, bodyTextStyle } = this.props;
        return React.isValidElement(body) ? body : (React.createElement(View, { style: dialogStyles.body },
            React.createElement(Text, { style: [dialogStyles.bodyText, bodyTextStyle] }, bodyText)));
    }
    getFooter() {
        const styles = dialogStyles;
        let { cancelLabel, cancelLabelText, cancelLabelTextStyle, cancelCallback, confirmLabel, confirmLabelText, confirmLabelTextStyle, confirmCallback, operationsLayout, operations, } = this.props;
        operations = operations || [];
        if (!operations.length) {
            if (cancelLabel || cancelLabelText || cancelCallback) {
                operations.push({
                    label: cancelLabel,
                    labelText: cancelLabelText,
                    labelTextStyle: cancelLabelTextStyle,
                    type: 'cancel',
                    onPress: cancelCallback
                });
            }
            if (confirmLabel || confirmLabelText || confirmCallback) {
                operations.push({
                    label: confirmLabel,
                    labelText: confirmLabelText,
                    labelTextStyle: confirmLabelTextStyle,
                    type: 'confirm',
                    onPress: confirmCallback
                });
            }
        }
        const length = operations.length;
        if (!length) {
            return null;
        }
        const operationEls = [];
        operations.forEach((item, index) => {
            operationEls.push(React.createElement(TouchableOpacity, { key: index, style: {
                    flexDirection: 'row',
                    flex: operationsLayout === 'column' ? null : 1
                }, activeOpacity: variables.mtdOpacity, onPress: () => {
                    item.onPress && item.onPress(item, index);
                    this.close();
                } }, React.isValidElement(item.label) ? item.label : (item.labelText ?
                React.createElement(View, { style: [
                        item.type === 'cancel' ? styles.btnCancelWrapper : styles.btnConfirmWrapper
                    ] },
                    React.createElement(Text, { style: [item.type === 'cancel' ? styles.btnCancelText : styles.btnConfirmText, item.labelTextStyle] }, item.labelText)) : null)));
            if (index < length - 1) {
                operationEls.push(React.createElement(View, { key: index + 'x', style: { flexDirection: operationsLayout === 'column' ? 'row' : 'column' } },
                    React.createElement(View, { style: {
                            flex: 1,
                            [operationsLayout === 'column' ? 'height' : 'width']: 1 * px,
                            backgroundColor: variables.mtdBorderColorDark
                        } })));
            }
        });
        return (React.createElement(View, { style: [
                styles.footer,
                { flexDirection: operationsLayout }
            ] }, operationEls));
    }
    render() {
        return null;
    }
}
Dialog.defaultProps = {
    ...Modal.defaultProps,
    style: {
        flex: 1,
        marginHorizontal: 40,
    },
    title: '标题',
    titleStyle: {},
    header: null,
    bodyText: '内容',
    bodyTextStyle: {},
    body: null,
    cancelable: true,
    cancelLabel: null,
    cancelLabelText: '取消',
    cancelLabelTextStyle: {},
    cancelCallback: null,
    confirmLabel: null,
    confirmLabelText: '确定',
    confirmLabelTextStyle: {},
    confirmCallback: null,
    operationsLayout: 'row',
    operations: null,
};
//# sourceMappingURL=index.js.map