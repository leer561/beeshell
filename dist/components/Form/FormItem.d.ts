import { Component, ReactNode, ReactChild } from 'react';
export interface FormItemProps {
    style?: any;
    label?: string | ReactNode;
    labelWidth?: number;
    hasLine?: boolean;
    children?: ReactChild[] | ReactChild;
}
interface FormItemState {
}
export declare class FormItem extends Component<FormItemProps, FormItemState> {
    static defaultProps: {
        style: {};
        label: string;
        labelWidth: any;
        hasLine: boolean;
    };
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderItem: () => JSX.Element;
    render(): JSX.Element;
}
export {};
