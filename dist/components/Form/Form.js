import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import formStyles from './styles';
import { FormItem } from './FormItem';
const styles = StyleSheet.create(formStyles);
export class Form extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement(View, { testID: this.props.testID, style: [styles.form, this.props.style] }, this.props.children));
    }
}
Form.displayName = 'Form';
Form.defaultProps = {
    style: {}
};
Form.Item = FormItem;
//# sourceMappingURL=Form.js.map