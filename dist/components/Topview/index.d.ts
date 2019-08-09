import { Component, ReactElement } from 'react';
declare class Topview extends Component<any, {
    count: number;
    modelList: Array<any>;
}> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    add(c: ReactElement<any>, args?: any): Promise<void | {}>;
    remove(id: number): Promise<void | {}>;
    replace(c: any, id: any): Promise<void | {}>;
    render(): JSX.Element;
}
declare function getInstance(): any;
export { getInstance as TopviewGetInstance, Topview };
