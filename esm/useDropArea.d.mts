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
declare const useDropArea: (options?: DropAreaOptions) => [DropAreaBond, DropAreaState];

export { type DropAreaBond, type DropAreaOptions, type DropAreaState, useDropArea as default };
