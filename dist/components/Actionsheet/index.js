import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { SlideModal } from '../SlideModal';
import actionsheetStyles from './styles';
export { actionsheetStyles };
const window = Dimensions.get('window');
export class Actionsheet extends SlideModal {
    constructor(props) {
        super(props);
    }
    getHeader() {
        const styles = actionsheetStyles;
        const { header } = this.props;
        return React.isValidElement(header) ? header : (React.createElement(View, { style: styles.header },
            React.createElement(Text, { style: styles.title }, header)));
    }
    getBody() {
        const { data, maxShowNum, renderItem } = this.props;
        const styles = actionsheetStyles;
        return (React.createElement(ScrollView, { style: [
                styles.body,
                maxShowNum != null ? { maxHeight: 50 * maxShowNum + 30 } : {}
            ], alwaysBounceVertical: maxShowNum != null }, data.map((item, index) => {
            const tmpStyle = index === data.length - 1 ? { borderBottomWidth: 0 } : {};
            return (React.createElement(TouchableOpacity, { key: index, onPress: () => {
                    this.handlePress('confirm', item, index);
                } }, renderItem ?
                renderItem(item, index) :
                React.createElement(View, { style: [
                        styles.item,
                        tmpStyle
                    ] },
                    React.createElement(Text, { style: styles.itemText }, typeof item === 'object' ? item['label'] : item))));
        })));
    }
    handlePress(type, item, index) {
        const callbackName = 'onPress' + type.slice(0, 1).toUpperCase() + type.slice(1);
        this.close().then(() => {
            this.props[callbackName] && this.props[callbackName](item, index);
        }).catch((e) => {
            console.log(e);
        });
    }
    getFooter() {
        const { footer } = this.props;
        const styles = actionsheetStyles;
        return (React.createElement(TouchableOpacity, { style: { marginTop: 4 }, onPress: () => {
                this.handlePress('cancel');
            } }, footer && React.isValidElement(footer) ?
            footer :
            React.createElement(View, { style: [
                    styles.item,
                    { borderBottomWidth: 0 }
                ] },
                React.createElement(Text, { style: styles.itemText }, footer))));
    }
    getContent() {
        const styles = actionsheetStyles;
        const inner = (React.createElement(View, { style: [styles.container, { width: window.width }] },
            this.getHeader(),
            this.getBody(),
            this.getFooter(),
            this.props.useSafeAreaView ?
                React.createElement(View, { style: { maxHeight: 30 }, onLayout: (e) => {
                        // const { height } = e.nativeEvent.layout
                        // console.log('Actionsheet SafeAreaView height: ', height)
                    } },
                    React.createElement(SafeAreaView, { style: { flex: 1 } },
                        React.createElement(View, { style: { height: 60 } }))) : null));
        return SlideModal.prototype.getContent.call(this, inner);
    }
}
Actionsheet.defaultProps = {
    ...SlideModal.defaultProps,
    cancelable: true,
    maxShowNum: null,
    header: '标题',
    footer: '取消',
    useSafeAreaView: true,
    data: [],
    renderItem: null,
    onPressCancel: null,
    onPressConfirm: null
};
//# sourceMappingURL=index.js.map