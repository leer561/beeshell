import { Component, ReactElement, ReactChild } from 'react';
import { ViewStyle, RegisteredStyle } from 'react-native';
interface CheckboxProps {
    style?: ViewStyle | RegisteredStyle<ViewStyle>;
    value?: any[];
    iconPosition?: 'left' | 'right';
    onChange?: Function;
    showAllCheck?: boolean;
    children: ReactChild[] | ReactChild;
    checkedIcon?: ReactElement<any>;
    uncheckedIcon?: ReactElement<any>;
}
export default class Checkbox extends Component<CheckboxProps, {}> {
    static displayName: string;
    static Item: any;
    childCount: number;
    childValueArray: any[];
    static defaultProps: {
        value: any[];
        showAllCheck: boolean;
        onChange: any;
        iconPosition: string;
        checkedIcon: JSX.Element;
        uncheckedIcon: JSX.Element;
    };
    constructor(props: any);
    componentDidMount(): void;
    handleChange: (itemValue: any, checked: number | boolean, allCheckTag?: boolean) => void;
    validateChecked(childProps: any): boolean;
    getAllCheckedStatus(): 2 | 1 | 3;
    render(): JSX.Element;
}
export {};
