import React from 'react';
import { Text, View } from 'react-native';
import tagStyles from './styles';
export { tagStyles };
import variables from '../../common/styles/variables';
export class Tag extends React.Component {
    render() {
        const { type, style, children, textColorInverse, textStyle } = this.props;
        const styleWrapper = tagStyles[type + 'Wrapper'] || tagStyles.defaultWrapper;
        const styleText = tagStyles[type + 'Text'] || tagStyles.defaultText;
        const reverseStyle = textColorInverse && type !== 'default' ? { color: variables.mtdGrayBase } : {};
        return (React.createElement(View, { style: [
                styleWrapper,
                style
            ] }, React.isValidElement(children) ? children :
            React.createElement(Text, { style: [
                    styleText,
                    reverseStyle,
                    textStyle,
                ] }, children)));
    }
}
Tag.defaultProps = {
    type: 'default',
    style: {},
    textColorInverse: false,
    textStyle: {}
};
//# sourceMappingURL=index.js.map