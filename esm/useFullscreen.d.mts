import { RefObject } from 'react';

interface FullScreenOptions {
    video?: RefObject<HTMLVideoElement & {
        webkitEnterFullscreen?: () => void;
        webkitExitFullscreen?: () => void;
    }>;
    onClose?: (error?: Error) => void;
}
declare const useFullscreen: (ref: RefObject<Element>, enabled: boolean, options?: FullScreenOptions) => boolean;

export { type FullScreenOptions, useFullscreen as default };
