export class FetchError extends Error {
    constructor(message: string | undefined) {
        super(message);
    }
}