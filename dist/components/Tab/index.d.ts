import React from 'react';
import { ViewStyle } from 'react-native';
interface Props {
    style?: ViewStyle;
    dataContainerStyle?: ViewStyle;
    dataItemContainerStyle?: ViewStyle;
    dataItemStyle?: ViewStyle;
    activeColor?: string;
    value?: any;
    data?: any[];
    renderItem?: Function;
    onChange?: Function;
    scrollable?: boolean;
}
interface State {
}
export declare class Tab extends React.Component<Props, State> {
    private _container;
    private _scroller;
    private _itemLayouts;
    private _scrollerContentOffsetX;
    static defaultProps: {
        activeColor: any;
        value: any;
        data: any[];
        onChange: any;
        scrollable: boolean;
    };
    scrollTo(index?: number): void;
    calucateDistance(index: any, baseX: any, containerWidth: any): any;
    renderItems(): JSX.Element[];
    renderItemContent: (item: any, index: any, active: any) => JSX.Element[];
    handleLayoutItem: (index: any, item: any, e: any) => void;
    handleScroll: (e: any) => void;
    render(): JSX.Element;
}
export {};
