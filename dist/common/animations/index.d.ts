declare class CommonAnimated {
    state: any;
    animated: any;
    constructor(props?: any);
    getState(): any;
    setState(key: any, value: any): void;
    stop(): void;
    toIn(): void;
    toOut(): void;
}
export declare class FadeAnimated extends CommonAnimated {
    constructor(props?: any);
    getPropertyValue(type: any, tag: any): any;
    toIn(): Promise<void | {}>;
    toOut(): Promise<void | {}>;
    reset(params: any): void;
    fade(tag: boolean): Promise<void | {}>;
}
export declare class SlideAnimated extends CommonAnimated {
    constructor(props?: any);
    reset(params: any): void;
    getPropertyValue(type: any, tag: any): any;
    toIn(): Promise<void | {}>;
    toOut(): Promise<void | {}>;
    slide(tag: boolean): Promise<void | {}>;
}
export {};
