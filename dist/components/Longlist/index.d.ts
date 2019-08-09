import { FlatListProps } from 'react-native';
import React from 'react';
export interface LonglistProps extends FlatListProps<any> {
    data: Array<any>;
    total?: number;
    onEndReached?: any;
    onRefresh?: any;
    renderFooter?: any;
    initialNumToRender?: number;
}
export declare class Longlist extends React.Component<LonglistProps, any> {
    flatList: any;
    static defaultProps: {
        total: number;
        data: any[];
        initialNumToRender: number;
    };
    constructor(props: any);
    handleEndReached: () => void;
    handleRefresh: () => void;
    renderFooter(): JSX.Element;
    render(): JSX.Element;
}
