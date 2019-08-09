/// <reference types="react" />
import { Modal, ModalProps } from '../Modal';
export interface TipProps extends ModalProps {
    body?: any;
    duration?: number | null;
    position?: 'top' | 'left' | 'right' | 'bottom' | 'center' | ['top', 'left'] | ['top'] | ['top', 'right'] | ['left'] | ['center'] | ['right'] | ['bottom', 'left'] | ['bottom'] | ['bottom', 'right'];
}
export declare class Tip extends Modal<TipProps> {
    static defaultProps: {
        position: string;
        style: {
            marginHorizontal: number;
            marginVertical: number;
        };
        cancelable: boolean;
        backdropColor: string;
        body: string;
        duration: any;
        scrollable: boolean;
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
    static tipInstance: any;
    static show: (msg: string, duration?: number, cancelable?: boolean, position?: string | string[]) => void;
    static hide: () => void;
    constructor(props: any);
    init(props: any, syncTag?: boolean): void;
    componentWillReceiveProps(nextProps: any): void;
    getContent(c: any): any;
    getBody(c: any): JSX.Element;
    open(c: any): any;
    render(): any;
}
