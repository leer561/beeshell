import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import variables from '../../common/styles/variables';
import formStyles from './styles';
const styles = StyleSheet.create(formStyles);
export class FormItem extends Component {
    constructor(props) {
        super(props);
        this.renderItem = () => {
            const children = this.props.children && Array.isArray(this.props.children) ?
                this.props.children : [this.props.children];
            return (React.createElement(View, null,
                React.createElement(View, { style: [styles.formItem, this.props.style] },
                    this.props.label && React.createElement(View, { style: styles.container },
                        React.isValidElement(this.props.label) ? this.props.label :
                            React.createElement(View, { style: [styles.label, { width: this.props.labelWidth }] },
                                React.createElement(Text, { style: styles.labelText }, this.props.label)),
                        React.createElement(View, { style: [styles.control] }, children[0])),
                    [].slice.call(children, 1).length ? React.createElement(View, { style: styles.others }, [].slice.call(children, 1)) : null),
                this.props.hasLine ? React.createElement(View, { style: styles.line }) : null));
        };
        this.state = {
            validation: '',
            valid: false,
            validating: false
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    render() {
        return this.renderItem();
    }
}
FormItem.defaultProps = {
    style: {},
    label: '标题',
    labelWidth: variables.formItemLabelWidth,
    hasLine: false
};
//# sourceMappingURL=FormItem.js.map