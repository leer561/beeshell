import React from 'react';
import { ScrollpickerProps } from '../Scrollpicker';
export interface TimepickerProps extends ScrollpickerProps {
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    value?: any;
    onChange?: Function;
}
export declare class Timepicker extends React.Component<TimepickerProps, any> {
    static defaultProps: {
        hourStep: number;
        minuteStep: number;
        secondStep: number;
        style: {};
        list: string[][];
        value: any[];
        proportion: number[];
        offsetCount: number;
        onChange: any;
        renderItem: any;
    };
    constructor(props: any);
    init(props: any): any;
    componentWillReceiveProps(nextProps: any): void;
    handleChange: (columnIndex: any, rowIndex: any) => void;
    render(): JSX.Element;
}
