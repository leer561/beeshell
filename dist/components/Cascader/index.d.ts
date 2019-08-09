import { Component } from 'react';
export interface CascaderProps {
    style?: any;
    data?: any[];
    dataStructureType?: 'nested' | 'flattened';
    value?: any[];
    fieldKeys?: any;
    proportion?: number[];
    isLeafNode?: Function;
    onChange?: Function;
    renderItem?: Function;
}
export declare class Cascader extends Component<CascaderProps, any> {
    static displayName: string;
    static defaultProps: {
        data: any[];
        dataStructureType: string;
        value: any[];
        fieldKeys: {};
        proportion: number[];
        onChange: any;
        renderItem: any;
    };
    static resetChecked(tree: any, item: any, checkType: any, checked: any, fieldKeys: any): any[];
    static getCheckedInfo(tree: any, checkType: any, fieldKeys: any): {
        checkedValue: any[];
        checkedResult: any[];
    };
    static recursiveAncestors(tree: any, item: any, fieldKeys: any, ret?: any): any;
    constructor(props: any);
    init(props: any): {
        tree: any;
        menu: any[];
    };
    resetActive(tree: any, activeItem: any, fieldKeys: any): any;
    getMenu(tree: any, fieldKeys: any): any[];
    getFieldKeys(props?: any): {
        idKey: any;
        pIdKey: any;
        labelKey: any;
        childrenKey: any;
        activeKey: any;
        checkedKey: any;
        disabledKey: any;
    };
    componentWillReceiveProps(nextProps: any): void;
    componentDidMount(): void;
    handlePress: (item: any, index: any) => void;
    renderMenuItem(menuItem: any, menuIndex: any, menu: any): JSX.Element;
    renderItem(item: any, index: any): JSX.Element;
    render(): JSX.Element;
}
