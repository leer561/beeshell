import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import styleObject from './styles';
const styles = StyleSheet.create(styleObject);
export class Badge extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { style, label, labelStyle } = this.props;
        if (label != null) {
            return (React.createElement(View, { style: [styles.wrapper, style] },
                React.createElement(Text, { style: [styles.label, labelStyle] }, label)));
        }
        else {
            return (React.createElement(View, { style: [styles.dot, style] }));
        }
    }
}
Badge.defaultProps = {};
//# sourceMappingURL=index.js.map