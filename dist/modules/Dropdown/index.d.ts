import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import { SlideModalProps } from '../../components/SlideModal';
interface OptionItem {
    label: string;
    [propName: string]: any;
}
export interface DropdownProps extends SlideModalProps {
    testID?: string;
    style?: ViewStyle;
    direction?: 'up' | 'down';
    data: Array<OptionItem>;
    value: any;
    checkedIcon?: ReactElement<any>;
    uncheckedIcon?: ReactElement<any>;
    onChange: Function;
}
export declare class Dropdown extends React.Component<DropdownProps> {
    private slideModal;
    private animated;
    static defaultProps: {
        cancelable: boolean;
        direction: string;
        fullScreenPatch: any;
        data: any[];
        styles: {};
        offsetX: number;
        offsetY: any;
        align: string;
        scrollable: boolean;
        backdropColor: any;
        screenWidth: number;
        screenHeight: number;
        animatedTranslateX: any;
        animatedTranslateY: any;
        containerStyle: {};
        style: {};
        onOpen: any;
        onOpened: any;
        onClose: any;
        onClosed: any;
    };
    constructor(props: any);
    open(): any;
    close(): any;
    getContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
