import React from 'react';
import { ViewStyle } from 'react-native';
import scrollpickerStyles from './styles';
export { scrollpickerStyles };
interface ListItem {
    label: string | number;
    [propName: string]: any;
}
export interface ScrollpickerProps {
    style?: ViewStyle;
    list?: Array<Array<ListItem>> | any;
    value?: number[];
    proportion?: number[];
    offsetCount?: number;
    onChange?: Function;
    renderItem?: Function;
}
interface ScrollpickerState {
    list: Array<Array<ListItem>>;
    value: number[];
    proportion: number[];
    targetItemHeight: number;
    containerHeight: number;
}
export declare class Scrollpicker extends React.Component<ScrollpickerProps, ScrollpickerState> {
    containerRef: any;
    scrollers: any[];
    targetItemHeight: any;
    containerHeight: any;
    static defaultProps: {
        style: {};
        list: string[][];
        value: any[];
        proportion: number[];
        offsetCount: number;
        onChange: any;
        renderItem: any;
    };
    constructor(props: any);
    initialize(props: any): {
        list: any;
        value: any;
        proportion: any;
    };
    initData(props: any): {
        list: any;
        value: any;
        proportion: any;
    };
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    getUIData(element: any, accurateHeight: any, maxCount?: any): Promise<{}>;
    resizeContainerHeight(targetItemHeight: any): any;
    locateIndicator(targetItemHeight: any): JSX.Element;
    scrollTo(scrollIndex: any, targetItemIndex: any, animated?: any): void;
    onScroll(scrollIndex: any, scrollHeight: any): void;
    scrollProper(scrollIndex: any, scrollHeight: any, animated?: any): number;
    render(): JSX.Element;
}
