/**
 * read and write url hash, response to url hash change
 */
declare const useHash: () => readonly [string, (newHash: string) => void];

export { useHash };
