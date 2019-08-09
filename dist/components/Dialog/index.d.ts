import { ReactElement } from 'react';
import { TextStyle } from 'react-native';
import { Modal, ModalProps } from '../Modal';
interface Operation {
    label?: ReactElement<any>;
    labelText?: string;
    labelTextStyle?: TextStyle;
    type?: 'cancel' | 'confirm';
    onPress: Function;
}
export interface DialogProps extends ModalProps {
    title?: string;
    titleStyle?: TextStyle;
    header?: any;
    bodyText?: string;
    bodyTextStyle?: TextStyle;
    body?: any;
    cancelLabel?: any;
    cancelLabelText?: string;
    cancelLabelTextStyle?: TextStyle;
    cancelCallback?: Function;
    confirmLabel?: any;
    confirmLabelText?: string;
    confirmLabelTextStyle?: TextStyle;
    confirmCallback?: Function;
    operationsLayout?: 'row' | 'column';
    operations?: Array<Operation>;
}
export declare class Dialog extends Modal<DialogProps> {
    static defaultProps: {
        style: {
            flex: number;
            marginHorizontal: number;
        };
        title: string;
        titleStyle: {};
        header: any;
        bodyText: string;
        bodyTextStyle: {};
        body: any;
        cancelable: boolean;
        cancelLabel: any;
        cancelLabelText: string;
        cancelLabelTextStyle: {};
        cancelCallback: any;
        confirmLabel: any;
        confirmLabelText: string;
        confirmLabelTextStyle: {};
        confirmCallback: any;
        operationsLayout: string;
        operations: any;
        scrollable: boolean;
        backdropColor: any;
        screenWidth: number;
        screenHeight: number;
        offsetX: number;
        offsetY: number;
        animatedTranslateX: any;
        animatedTranslateY: any;
        containerStyle: {};
        onOpen: any;
        onOpened: any;
        onClose: any;
        onClosed: any;
    };
    constructor(props: any);
    getContent(): any;
    getHeader(): JSX.Element;
    getBody(): JSX.Element;
    getFooter(): JSX.Element;
    render(): any;
}
export {};
