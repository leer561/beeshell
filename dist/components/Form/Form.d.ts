import { Component } from 'react';
import { ViewStyle } from 'react-native';
import { FormItem } from './FormItem';
export interface FormProps {
    testID?: string;
    style?: ViewStyle;
}
interface FormState {
}
export declare class Form extends Component<FormProps, FormState> {
    static displayName: string;
    static defaultProps: {
        style: {};
    };
    static Item: typeof FormItem;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
