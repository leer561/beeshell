import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';
import { Icon } from '../Icon';
import variables from '../../common/styles/variables';
export default class Radio extends Component {
    constructor(props) {
        super(props);
        this.handleChange = (value) => {
            this.props.onChange && this.props.onChange(value);
        };
    }
    /**
     * 检查是否选中
     */
    verifyChecked(props) {
        let { value } = props;
        return this.props.value === value ? true : false;
    }
    renderChildren() {
        return React.Children.map(this.props.children, (child, index) => {
            // 需要子组件自己定义了 displayName
            if (child.type.displayName === 'RadioItem') {
                const checked = this.verifyChecked(child.props);
                return React.cloneElement(child, {
                    key: index,
                    iconPosition: this.props.iconPosition,
                    checked,
                    onChange: this.handleChange,
                    checkedIcon: this.props.checkedIcon,
                    uncheckedIcon: this.props.uncheckedIcon
                });
            }
            else {
                return React.cloneElement(child);
            }
        });
    }
    render() {
        return (React.createElement(View, { style: [styles.radioContainer, this.props.style] }, this.renderChildren()));
    }
}
Radio.displayName = 'Radio';
Radio.defaultProps = {
    style: {},
    value: undefined,
    onChange: null,
    iconPosition: 'left',
    checkedIcon: React.createElement(Icon, { source: require(`../../common/images/icons/check.png`), size: variables.mtdFontSizeM, tintColor: variables.mtdBrandPrimaryDark }),
    uncheckedIcon: React.createElement(View, { style: { width: variables.mtdFontSizeM, height: variables.mtdFontSizeM } })
};
//# sourceMappingURL=Radio.js.map