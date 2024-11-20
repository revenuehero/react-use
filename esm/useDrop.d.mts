interface DropAreaState {
    over: boolean;
}
interface DropAreaBond {
    onDragOver: React.DragEventHandler;
    onDragEnter: React.DragEventHandler;
    onDragLeave: React.DragEventHandler;
    onDrop: React.DragEventHandler;
    onPaste: React.ClipboardEventHandler;
}
interface DropAreaOptions {
    onFiles?: (files: File[], event?: any) => void;
    onText?: (text: string, event?: any) => void;
    onUri?: (url: string, event?: any) => void;
}
declare const useDrop: (options?: DropAreaOptions, args?: never[]) => DropAreaState;

export { type DropAreaBond, type DropAreaOptions, type DropAreaState, useDrop as default };
