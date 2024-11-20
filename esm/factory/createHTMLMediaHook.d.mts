import * as react from 'react';

interface HTMLMediaProps extends react.AudioHTMLAttributes<any>, react.VideoHTMLAttributes<any> {
    src: string;
}
interface HTMLMediaState {
    buffered: any[];
    duration: number;
    paused: boolean;
    muted: boolean;
    time: number;
    volume: number;
    playing: boolean;
}
interface HTMLMediaControls {
    play: () => Promise<void> | void;
    pause: () => void;
    mute: () => void;
    unmute: () => void;
    volume: (volume: number) => void;
    seek: (time: number) => void;
}
declare type MediaPropsWithRef<T> = HTMLMediaProps & {
    ref?: react.MutableRefObject<T | null>;
};
declare function createHTMLMediaHook<T extends HTMLAudioElement | HTMLVideoElement>(tag: 'audio' | 'video'): (elOrProps: HTMLMediaProps | react.ReactElement<HTMLMediaProps>) => readonly [react.ReactElement<MediaPropsWithRef<T>, string | ((props: any) => react.ReactElement<any, string | any | (new (props: any) => react.Component<any, any, any>)> | null) | (new (props: any) => react.Component<any, any, any>)>, HTMLMediaState, {
    play: () => Promise<void> | undefined;
    pause: () => void;
    seek: (time: number) => void;
    volume: (volume: number) => void;
    mute: () => void;
    unmute: () => void;
}, react.MutableRefObject<T | null>];

export { type HTMLMediaControls, type HTMLMediaProps, type HTMLMediaState, createHTMLMediaHook as default };
