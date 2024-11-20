declare type SpeechOptions = {
    lang: string;
    voice?: SpeechSynthesisVoice;
    rate: number;
    pitch: number;
    volume: number;
};
declare type ISpeechOptions = Partial<SpeechOptions>;
declare type VoiceInfo = Pick<SpeechSynthesisVoice, 'lang' | 'name'>;
declare type ISpeechState = SpeechOptions & {
    isPlaying: boolean;
    status: string;
    voiceInfo: VoiceInfo;
};
declare const useSpeech: (text: string, options: ISpeechOptions) => ISpeechState;

export { type ISpeechOptions, type ISpeechState, type VoiceInfo, useSpeech as default };
