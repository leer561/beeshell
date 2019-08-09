import { Component } from 'react';
import { ViewStyle } from 'react-native';
export interface StepperProps {
    style?: ViewStyle;
    operatorStyle?: ViewStyle;
    operatorIconColor?: string;
    min?: number;
    max?: number;
    value?: number | string;
    step?: number;
    editable?: boolean;
    onChange?: Function;
}
export interface StepperState {
}
export declare class Stepper extends Component<StepperProps, StepperState> {
    private textInputValue;
    static defaultProps: {
        operatorIconColor: any;
        min: number;
        max: number;
        step: number;
        editable: boolean;
    };
    constructor(props: any);
    onDecrease: () => void;
    onIncrease: () => void;
    onChangeText: (value: any) => void;
    changeValue: (value: any, step: number, action: any) => void;
    isEmpty(value: any): boolean;
    render(): JSX.Element;
}
