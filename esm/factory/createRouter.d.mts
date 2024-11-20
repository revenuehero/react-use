interface RouterProviderProps {
    route: string;
    fullRoute?: string;
    parent?: any;
}
declare const createRouter: () => void;

export { type RouterProviderProps, createRouter as default };
