declare function dispatch(...funcs: Function[]): (...args: any[]) => boolean;
declare function register(key: string, func: Function): (...args: any[]) => boolean;
declare const _default: {
    dispatch: typeof dispatch;
    register: typeof register;
};
export default _default;
