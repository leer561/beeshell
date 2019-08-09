import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import cascaderStyles from './styles';
const styles = StyleSheet.create(cascaderStyles);
import { Icon } from '../Icon';
import variables from '../../common/styles/variables';
import Tree from '../../common/utils/Tree';
export class Cascader extends Component {
    constructor(props) {
        super(props);
        this.handlePress = (item, index) => {
            const fieldKeys = this.getFieldKeys();
            const { tree } = this.state;
            if (item[fieldKeys.activeKey]) {
                return;
            }
            if (item[fieldKeys.disabledKey]) {
                return;
            }
            let tmpTree = this.resetActive(tree, item, fieldKeys);
            tmpTree = Cascader.resetChecked(tmpTree, item, 'radio', true, fieldKeys);
            const { checkedValue, checkedResult } = Cascader.getCheckedInfo(tmpTree, 'radio', fieldKeys);
            const menu = this.getMenu(tmpTree, fieldKeys);
            this.props.onChange && this.props.onChange(checkedValue, checkedResult);
            this.setState({
                tree: tmpTree,
                menu,
            });
        };
        this.state = {
            ...this.state,
            ...this.init(props)
        };
    }
    static resetChecked(tree, item, checkType, checked, fieldKeys) {
        let tmpTree = [
            ...tree,
        ];
        if (checkType === 'checkbox') {
            // TODO
        }
        if (checkType === 'radio') {
            tmpTree = resetRadio(tmpTree, item, checked, fieldKeys);
        }
        return tmpTree;
        function resetRadio(tree, item, checked, fieldKeys) {
            let tmpTree = [
                ...tree
            ];
            tmpTree = tmpTree.map((treeItem) => {
                if (treeItem[fieldKeys.idKey] === item[fieldKeys.idKey]) {
                    return {
                        ...treeItem,
                        [fieldKeys.checkedKey]: true
                    };
                }
                else {
                    return {
                        ...treeItem,
                        [fieldKeys.checkedKey]: false
                    };
                }
            });
            return tmpTree;
        }
    }
    static getCheckedInfo(tree, checkType, fieldKeys) {
        const checkedValue = [];
        const checkedResult = [];
        if (checkType === 'checkbox') {
            // TODO
        }
        if (checkType === 'radio') {
            tree.some((treeItem) => {
                if (treeItem[fieldKeys.checkedKey]) {
                    checkedValue.push(treeItem[fieldKeys.idKey]);
                    return true;
                }
                return false;
            });
        }
        checkedValue.forEach((valueItem, valueIndex) => {
            const target = tree.filter((treeItem) => {
                return treeItem[fieldKeys.idKey] === valueItem;
            })[0];
            const ancestors = Cascader.recursiveAncestors(tree, target, fieldKeys);
            ancestors.push(target);
            checkedResult[valueIndex] = ancestors;
        });
        return {
            checkedValue,
            checkedResult,
        };
    }
    static recursiveAncestors(tree, item, fieldKeys, ret) {
        ret = ret || [];
        const parentItem = tree.filter((treeItem) => {
            return treeItem[fieldKeys.idKey] === item[fieldKeys.pIdKey];
        })[0];
        if (parentItem) {
            ret = ret.concat();
            ret.unshift(parentItem);
            return Cascader.recursiveAncestors(tree, parentItem, fieldKeys, ret);
        }
        else {
            return ret;
        }
    }
    init(props) {
        const fieldKeys = this.getFieldKeys(props);
        const { data, dataStructureType } = props;
        const value = props.value || [];
        let tree = new Tree({
            type: dataStructureType,
            ...fieldKeys,
            data: data
        }).getData();
        /**
         * 重置 checked 状态
         */
        value.forEach((valueItem) => {
            const target = tree.filter((treeItem) => {
                return treeItem[fieldKeys.idKey] === valueItem;
            })[0];
            if (!target) {
                console.log(`值${valueItem}在数据集合中不存在`);
                return;
            }
            tree = Cascader.resetChecked(tree, target, 'radio', true, fieldKeys);
        });
        /**
         * 重置 active 状态
         */
        let activeItem;
        if (value[0] != null) {
            activeItem = tree.filter((treeItem) => {
                return treeItem[fieldKeys.idKey] === value[0];
            })[0];
        }
        tree = this.resetActive(tree, activeItem, fieldKeys);
        const menu = this.getMenu(tree, fieldKeys);
        return {
            tree,
            menu,
        };
    }
    resetActive(tree, activeItem, fieldKeys) {
        if (!activeItem) {
            return tree;
        }
        let tmpTree = [
            ...tree,
        ];
        tmpTree = tmpTree.map((treeItem) => {
            return {
                ...treeItem,
                [fieldKeys.activeKey]: false
            };
        });
        recursive(activeItem);
        return tmpTree;
        function recursive(activeItem) {
            tmpTree = tmpTree.map((treeItem) => {
                if (treeItem[fieldKeys.idKey] === activeItem[fieldKeys.idKey]) {
                    return {
                        ...treeItem,
                        [fieldKeys.activeKey]: true
                    };
                }
                else {
                    return treeItem;
                }
            });
            const parentItem = tmpTree.filter((treeItem) => {
                return treeItem[fieldKeys.idKey] === activeItem[fieldKeys.pIdKey];
            })[0];
            if (parentItem) {
                recursive(parentItem);
            }
        }
    }
    getMenu(tree, fieldKeys) {
        const menu = [
            tree.filter((treeItem) => {
                return treeItem[fieldKeys.pIdKey] == null;
            })
        ];
        recursive(menu[0]);
        return menu;
        function recursive(list) {
            list.some((item) => {
                if (item[fieldKeys.activeKey]) {
                    const tmpList = tree.filter((treeItem) => {
                        return treeItem[fieldKeys.pIdKey] === item[fieldKeys.idKey];
                    });
                    if (tmpList && tmpList.length) {
                        menu.push(tmpList);
                        recursive(tmpList);
                    }
                    return true;
                }
                return false;
            });
        }
    }
    getFieldKeys(props) {
        props = props || this.props;
        const { fieldKeys } = props;
        return {
            idKey: fieldKeys.idKey || 'id',
            pIdKey: fieldKeys.pIdKey || 'pId',
            labelKey: fieldKeys.labelKey || 'label',
            childrenKey: fieldKeys.childrenKey || 'children',
            activeKey: fieldKeys.activeKey || 'active',
            checkedKey: fieldKeys.checkedKey || 'checked',
            disabledKey: fieldKeys.disabledKey || 'disabled'
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value ||
            nextProps.data !== this.props.data) {
            this.setState({
                ...this.init(nextProps)
            });
        }
    }
    componentDidMount() {
    }
    renderMenuItem(menuItem, menuIndex, menu) {
        const { proportion } = this.props;
        const style = {
            flex: proportion[menuIndex] || 1,
            borderRightColor: variables.mtdBorderColor,
            borderRightWidth: menuIndex < menu.length - 1 ? StyleSheet.hairlineWidth : 0
        };
        return (React.createElement(View, { style: style, key: menuIndex },
            React.createElement(ScrollView, null, menuItem.map((item, index) => {
                return this.renderItem(item, index);
            }))));
    }
    renderItem(item, index) {
        const fieldKeys = this.getFieldKeys();
        const { tree } = this.state;
        const isLeafNode = this.props.isLeafNode
            ? this.props.isLeafNode(item)
            : !(item && item[fieldKeys.childrenKey] && item[fieldKeys.childrenKey].length);
        const active = item[fieldKeys.activeKey];
        return (React.createElement(TouchableOpacity, { key: index, onPress: this.handlePress.bind(this, item, index) }, this.props.renderItem ? this.props.renderItem(item, index) :
            React.createElement(View, { style: [
                    styles.item,
                    active ? { backgroundColor: variables.mtdFillGray } : {},
                ] },
                React.createElement(Text, { style: [
                        styles.itemText,
                        active ? { color: variables.mtdBrandPrimaryDark, fontWeight: 'bold' } : {},
                    ], ellipsizeMode: 'middle' }, item[fieldKeys.labelKey]),
                !isLeafNode ? React.createElement(Icon, { source: require(`../../common/images/icons/angle-right.png`), size: variables.mtdFontSizeM, tintColor: variables.mtdGrayLighter }) : null)));
    }
    render() {
        const { style } = this.props;
        const { menu } = this.state;
        return (React.createElement(View, { style: [styles.container, style] }, menu.map((item, index) => {
            return this.renderMenuItem(item, index, menu);
        })));
    }
}
Cascader.displayName = 'Cascader';
Cascader.defaultProps = {
    data: [],
    dataStructureType: 'nested',
    value: [],
    fieldKeys: {},
    proportion: [2, 1, 1],
    onChange: null,
    renderItem: null
};
//# sourceMappingURL=index.js.map