import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import variables from '../../common/styles/variables';
import Tree from '../../common/utils/Tree';
import { Icon } from '../../components/Icon';
import treeViewStyles from './styles';
export class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.handlePress = (item) => {
            this.props.onPress && this.props.onPress(item);
            const { tree } = this.state;
            const fieldKeys = this.getFieldKeys();
            let index = null;
            tree.some((treeItem, treeIndex) => {
                if (treeItem[fieldKeys.idKey] === item[fieldKeys.idKey]) {
                    index = treeIndex;
                    return true;
                }
            });
            const tmpTree = tree.concat();
            tmpTree.splice(index, 1, {
                ...item,
                [fieldKeys.activeKey]: !item[fieldKeys.activeKey]
            });
            this.setState({
                tree: tmpTree
            });
        };
        this.state = {
            ...this.init(props)
        };
    }
    init(props) {
        const { dataStructureType, data } = props;
        const fieldKeys = this.getFieldKeys(props);
        const tree = new Tree({
            type: dataStructureType,
            ...fieldKeys,
            data
        }).getData();
        return {
            tree
        };
    }
    getFieldKeys(props) {
        props = props || this.props;
        const fieldKeys = props.fieldKeys || {};
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
    renderItem(data, level) {
        const { tree } = this.state;
        const { activeIcon, inactiveIcon } = this.props;
        const fieldKeys = this.getFieldKeys();
        if (!data) {
            data = tree.filter((item) => {
                return item[fieldKeys.pIdKey] == null;
            });
        }
        level = level || 1;
        return (React.createElement(View, null, data.map((item, index) => {
            const children = tree.filter((treeItem) => {
                return treeItem[fieldKeys.pIdKey] === item[fieldKeys.idKey];
            });
            return (React.createElement(View, { key: index, style: [
                    {
                        marginLeft: 20 * (level - 1)
                    }
                ] },
                React.createElement(TouchableOpacity, { style: [treeViewStyles.item], onPress: this.handlePress.bind(this, item) },
                    children.length && React.createElement(View, { style: treeViewStyles.itemIcon }, item[fieldKeys.activeKey] ? activeIcon : inactiveIcon),
                    React.createElement(Text, { style: [treeViewStyles.itemText] }, item[fieldKeys.labelKey])),
                children.length && !!item[fieldKeys.activeKey] ? this.renderItem(children, level + 1) : null));
        })));
    }
    render() {
        return (React.createElement(View, { style: [treeViewStyles.container, this.props.style] }, this.renderItem()));
    }
}
TreeView.defaultProps = {
    style: {},
    activeIcon: React.createElement(Icon, { source: require(`../../common/images/icons/angle-down.png`), tintColor: variables.mtdGrayBase }),
    inactiveIcon: React.createElement(Icon, { source: require(`../../common/images/icons/angle-right.png`), tintColor: variables.mtdGrayBase }),
    data: [],
    dataStructureType: 'nested',
    fieldKeys: {}
};
//# sourceMappingURL=index.js.map