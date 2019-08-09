import { StyleProp, ViewStyle } from 'react-native';
import { Modal, ModalProps } from '../Modal';
export declare const slideModalStyles: {
    container: {
        position: "absolute";
        top: number;
        left: number;
        bottom: number;
        right: number;
        flexDirection: "row";
        alignItems: "flex-start";
        justifyContent: "center";
        overflow: "hidden";
    };
    backdrop: {
        position: "absolute";
        top: number;
        left: number;
        bottom: number;
        right: number;
        backgroundColor: any;
    };
    content: {
        position: "absolute";
        overflow: "hidden";
    };
};
export interface SlideModalProps extends ModalProps {
    styles?: {
        root?: StyleProp<ViewStyle>;
        container?: StyleProp<ViewStyle>;
        backdrop?: StyleProp<ViewStyle>;
        content?: StyleProp<ViewStyle>;
    };
    screenWidth?: number;
    screenHeight?: number;
    offsetX?: number | null | undefined;
    offsetY?: number | null | undefined;
    direction?: 'up' | ['up'] | ['up', 'left'] | ['up', 'right'] | 'down' | ['down'] | ['down', 'left'] | ['down', 'right'] | 'left' | ['left'] | 'right' | ['right'];
    align?: 'left' | 'right' | 'up' | 'down';
    fullScreenPatch?: boolean[];
}
export declare class SlideModal<T extends SlideModalProps> extends Modal<T> {
    static defaultProps: {
        styles: {};
        cancelable: boolean;
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
    init(props: any, syncTag?: boolean): void;
    componentWillReceiveProps(nextProps: any): void;
    open(c: any): any;
    getRects(): {
        contentContainerRect: {
            top: any;
            bottom: any;
            left: any;
            right: any;
        };
        contentRect: {
            top: any;
            bottom: any;
            left: any;
            right: any;
        };
        contentClockwise1Rect: {
            top: any;
            bottom: any;
            left: any;
            right: any;
            backgroundColor: string;
        };
        contentClockwise2Rect: {
            top: any;
            bottom: any;
            left: any;
            right: any;
            backgroundColor: string;
        };
        contentClockwise3Rect: {
            top: any;
            bottom: any;
            left: any;
            right: any;
            backgroundColor: string;
        };
    };
    getFullScreenPatch(): {
        key: string;
        cancelable: T["cancelable"];
        closeFn: any;
        rect: any;
    }[];
    getContent(inner?: any): any;
    handleLayout: (e: any) => void;
}
