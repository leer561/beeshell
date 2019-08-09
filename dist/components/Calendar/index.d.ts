import React from 'react';
export interface CalendarProps {
    style?: any;
    locale?: string;
    format?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    onChange?: Function;
    renderItem?: Function;
}
export declare class Calendar extends React.Component<CalendarProps, any> {
    static defaultProps: {
        style: {};
        locale: string;
        format: string;
        date: string;
        startDate: string;
        endDate: string;
        renderItem: any;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    init(props: any): {
        date: any;
        selectedDate: any;
        startDate: any;
        endDate: any;
    };
    changeDate(type: any, method: any): void;
    selectDate: (viewDate: any) => void;
    isTargetMonth(item: any): boolean;
    isDisabled(item: any): boolean;
    renderHeader: () => JSX.Element;
    renderItem(item: any, date: any, desc: any): JSX.Element;
    renderWeekDay: (item: any, index: any) => JSX.Element;
    render(): JSX.Element;
}
