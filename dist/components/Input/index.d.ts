import { Component } from 'react';
import { TextInputProps, ViewStyle, TextStyle } from 'react-native';
interface InputProps extends TextInputProps {
    textAlign?: string;
    style?: ViewStyle;
    inputStyle?: TextStyle;
}
interface InputState {
    isEditing: boolean;
}
export declare class Input extends Component<InputProps, InputState> {
    static displayName: string;
    static defaultProps: {
        onChange: any;
        textAlign: string;
        placeholder: string;
        placeholderTextColor: any;
        autoFocus: boolean;
        autoCorrect: boolean;
        keyboardType: string;
        maxLength: any;
        editable: boolean;
        clearButtonMode: string;
        value: string;
    };
    delayIsEditing: any;
    constructor(props: any);
    componentWillUnmount(): void;
    handleChange: (value: any) => void;
    handleBlur: (e: any) => void;
    handleFocus: (e: any) => void;
    delayTaskMemoize: (duration: any) => {
        cancel(): void;
        delay(task: any): void;
    };
    modProps(props: any): any;
    renderiOS: () => JSX.Element;
    renderAndroidAndWeb: () => JSX.Element;
    render(): JSX.Element;
}
export {};
