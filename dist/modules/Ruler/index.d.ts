import { Component } from 'react';
import { ViewStyle } from 'react-native';
export interface RulerProps {
    style?: ViewStyle;
    direction?: 'vertical' | 'horizontal';
}
export declare class Ruler extends Component<RulerProps, any> {
    static defaultProps: {
        direction: string;
    };
    constructor(p: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    renderFullScreenView(): JSX.Element;
    render(): any;
}
