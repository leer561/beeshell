import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { CheckboxItemAllCheck } from './CheckboxItemAllCheck';
import checkboxStyles from './styles';
import variables from '../../common/styles/variables';
import { Icon } from '../Icon';
const styles = StyleSheet.create(checkboxStyles);
export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.childCount = 0;
        this.childValueArray = [];
        this.handleChange = (itemValue, checked, allCheckTag) => {
            const { value } = this.props;
            let tmpValue = value.concat();
            // 点击选项
            if (!allCheckTag) {
                const idx = value.indexOf(itemValue);
                if (checked) {
                    if (idx > -1) {
                        // donothing
                    }
                    else {
                        tmpValue.push(itemValue);
                    }
                }
                else {
                    if (idx > -1) {
                        tmpValue.splice(idx, 1);
                    }
                }
            }
            else {
                // 点击”全选“按钮
                if (checked === 1) {
                    tmpValue = [];
                }
                if (checked === 3) {
                    tmpValue = this.childValueArray.concat();
                }
            }
            this.props.onChange && this.props.onChange(tmpValue);
        };
        React.Children.map(this.props.children, (child) => {
            if (child.type.displayName === 'CheckboxItem') {
                this.childCount++;
                this.childValueArray.push(child.props.value);
            }
        });
    }
    componentDidMount() {
    }
    validateChecked(childProps) {
        const idx = this.props.value.indexOf(childProps.value);
        return idx > -1 ? true : false;
    }
    getAllCheckedStatus() {
        const { value } = this.props;
        if (value.length === 0) {
            return 1;
        }
        if (value.length < this.childCount) {
            return 2;
        }
        if (value.length >= this.childCount) {
            return 3;
        }
    }
    render() {
        const { showAllCheck, iconPosition, children, style, checkedIcon, uncheckedIcon } = this.props;
        return (React.createElement(View, { style: [styles.checkboxContainer, style] },
            showAllCheck ? React.createElement(CheckboxItemAllCheck, { checkedStatus: this.getAllCheckedStatus(), label: '\u5168\u9009', iconPosition: iconPosition, onChange: this.handleChange, checkedIcon: checkedIcon, uncheckedIcon: uncheckedIcon }) : null,
            React.Children.map(children, (child, index) => {
                // 需要子组件自己定义了 displayName
                if (child.type.displayName === 'CheckboxItem') {
                    const childProps = child.props;
                    const checked = this.validateChecked(childProps);
                    return React.cloneElement(child, {
                        key: index,
                        checked,
                        iconPosition,
                        onChange: this.handleChange,
                        checkedIcon,
                        uncheckedIcon,
                    });
                }
                else {
                    return React.cloneElement(child);
                }
            })));
    }
}
Checkbox.displayName = 'Checkbox';
Checkbox.Item = null;
Checkbox.defaultProps = {
    value: [],
    showAllCheck: false,
    onChange: null,
    iconPosition: 'left',
    checkedIcon: React.createElement(Icon, { source: require(`../../common/images/icons/check-circle.png`), size: variables.mtdFontSizeL, tintColor: variables.mtdBrandPrimaryDark }),
    uncheckedIcon: React.createElement(View, { style: styles.uncheckedIcon })
};
//# sourceMappingURL=Checkbox.js.map