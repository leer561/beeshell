import { SlideModal, SlideModalProps } from '../../components/SlideModal';
export interface PopoverProps extends SlideModalProps {
}
export declare class Popover extends SlideModal<PopoverProps> {
    static defaultProps: {
        backdropOpacity: number;
        offsetX: number;
        offsetY: number;
        direction: string;
        align: string;
        fullScreenPatch: boolean[];
        cancelable: boolean;
        styles: {};
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
    getContent(): any;
}
