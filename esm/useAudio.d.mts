import * as react from 'react';
import { HTMLMediaProps, HTMLMediaState } from './factory/createHTMLMediaHook.mjs';

declare const useAudio: (elOrProps: HTMLMediaProps | react.ReactElement<HTMLMediaProps, string | ((props: any) => react.ReactElement<any, string | any | (new (props: any) => react.Component<any, any, any>)> | null) | (new (props: any) => react.Component<any, any, any>)>) => readonly [react.ReactElement<HTMLMediaProps & {
    ref?: react.MutableRefObject<HTMLAudioElement | null> | undefined;
}, string | ((props: any) => react.ReactElement<any, string | any | (new (props: any) => react.Component<any, any, any>)> | null) | (new (props: any) => react.Component<any, any, any>)>, HTMLMediaState, {
    play: () => Promise<void> | undefined;
    pause: () => void;
    seek: (time: number) => void;
    volume: (volume: number) => void;
    mute: () => void;
    unmute: () => void;
}, react.MutableRefObject<HTMLAudioElement | null>];

export { useAudio as default };
