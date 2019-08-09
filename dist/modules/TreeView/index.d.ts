import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
export interface TreeViewProps {
    style?: ViewStyle;
    activeIcon?: ReactElement<any>;
    inactiveIcon?: ReactElement<any>;
    data?: any[];
    dataStructureType?: string;
    fieldKeys?: any;
    onPress?: Function;
}
export declare class TreeView extends React.Component<TreeViewProps, any> {
    static defaultProps: {
        style: {};
        activeIcon: JSX.Element;
        inactiveIcon: JSX.Element;
        data: any[];
        dataStructureType: string;
        fieldKeys: {};
    };
    constructor(props: any);
    init(props: any): {
        tree: any;
    };
    getFieldKeys(props?: any): {
        idKey: any;
        pIdKey: any;
        labelKey: any;
        childrenKey: any;
        activeKey: any;
        checkedKey: any;
        disabledKey: any;
    };
    handlePress: (item: any) => void;
    renderItem(data?: any, level?: any): JSX.Element;
    render(): JSX.Element;
}
