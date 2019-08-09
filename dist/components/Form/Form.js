import React, {Component, createContext} from 'react';
import {View, StyleSheet} from 'react-native';
import formStyles from './styles';
import {FormItem} from './FormItem';
import {FormContext} from './form-context'
const styles = StyleSheet.create(formStyles);

export class Form extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormContext.Provider value={this.props.formContext}>
                <View testID={this.props.testID} style={[styles.form, this.props.style]}>
                    {this.props.children}
                </View>
            </FormContext.Provider>
        );
    }
}

Form.displayName = 'Form';
Form.defaultProps = {
    style: {},
    formContext: {editable: true}
};
Form.Item = FormItem;
//# sourceMappingURL=Form.js.map
