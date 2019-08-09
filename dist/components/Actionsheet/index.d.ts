/// <reference types="react" />
import { SlideModal, SlideModalProps } from '../SlideModal';
import actionsheetStyles from './styles';
export { actionsheetStyles };
interface DataItem {
    label: string;
    [propName: string]: any;
}
interface ActionsheetProps extends SlideModalProps {
    header?: any;
    footer?: any;
    data?: DataItem[] | any;
    maxShowNum?: number | null | undefined;
    renderItem?: Function;
    onPressCancel?: Function;
    onPressConfirm?: Function;
    useSafeAreaView?: boolean;
}
export declare class Actionsheet extends SlideModal<ActionsheetProps> {
    static defaultProps: {
        cancelable: boolean;
        maxShowNum: any;
        header: string;
        footer: string;
        useSafeAreaView: boolean;
        data: any[];
        renderItem: any;
        onPressCancel: any;
        onPressConfirm: any;
        styles: {};
        offsetX: number;
        offsetY: any;
        direction: string;
        align: string;
        fullScreenPatch: boolean[];
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
    getHeader(): JSX.Element;
    getBody(): JSX.Element;
    handlePress(type: string, item?: any, index?: any): void;
    getFooter(): JSX.Element;
    getContent(): any;
}
