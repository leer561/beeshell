import React, { Component, ReactChild, ReactElement } from 'react';
interface RadioProps {
    style?: any;
    iconPosition?: 'left' | 'right';
    checkedIcon?: ReactElement<any>;
    uncheckedIcon?: ReactElement<any>;
    value?: any;
    onChange?: Function;
    children?: ReactChild[] | ReactChild;
}
export default class Radio extends Component<RadioProps> {
    static Item?: any;
    static displayName: string;
    static defaultProps: {
        style: {};
        value: any;
        onChange: any;
        iconPosition: string;
        checkedIcon: JSX.Element;
        uncheckedIcon: JSX.Element;
    };
    constructor(props: any);
    handleChange: (value: any) => void;
    /**
     * 检查是否选中
     */
    verifyChecked(props: any): boolean;
    renderChildren(): React.DetailedReactHTMLElement<{}, HTMLElement>[];
    render(): JSX.Element;
}
export {};
