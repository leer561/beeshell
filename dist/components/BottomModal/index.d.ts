import React from 'react';
import { TextStyle } from 'react-native';
import { SlideModal, SlideModalProps } from '../SlideModal';
export interface BottomModalProps extends SlideModalProps {
    testID?: string;
    titleContainer?: any;
    title?: string;
    titleStyle?: TextStyle;
    rightLabel?: any;
    rightLabelText?: string;
    rightLabelTextStyle?: TextStyle;
    rightCallback?: Function;
    leftLabel?: any;
    leftLabelText?: string;
    leftLabelTextStyle?: TextStyle;
    leftCallback?: Function;
}
export declare class BottomModal extends SlideModal<BottomModalProps> {
    static defaultProps: {
        cancelable: boolean;
        screenWidth: number;
        titleContainer: any;
        title: string;
        titleStyle: {};
        rightLabel: any;
        rightLabelText: string;
        rightLabelTextStyle: {};
        rightCallback: any;
        leftLabel: any;
        leftLabelText: string;
        leftLabelTextStyle: {};
        leftCallback: any;
        styles: {};
        offsetX: number;
        offsetY: any;
        direction: string;
        align: string;
        fullScreenPatch: boolean[];
        scrollable: boolean;
        backdropColor: any;
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
    getHeader(): JSX.Element;
    getBody(): React.ReactNode;
    getContent(): any;
}
