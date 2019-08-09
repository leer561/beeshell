import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
export interface PickerProps {
    style?: ViewStyle;
    label?: any;
    activeIcon?: ReactElement<any>;
    inactiveIcon?: ReactElement<any>;
    disabled?: boolean;
    cancelable?: boolean;
    onToggle?: Function;
}
export interface PickerState {
    active?: boolean;
    offsetY?: number;
}
export declare class Picker extends React.Component<PickerProps, PickerState> {
    private slideModal;
    private trigger;
    static defaultProps: {
        label: string;
        activeIcon: JSX.Element;
        inactiveIcon: JSX.Element;
        disabled: boolean;
        cancelable: boolean;
        style: {};
        onToggle: any;
    };
    constructor(props: any);
    handleToggle: (active: boolean) => Promise<{}>;
    handlePress: () => void;
    close(): any;
    open(): Promise<{}>;
    renderIcon(active: any): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
    render(): JSX.Element;
}
