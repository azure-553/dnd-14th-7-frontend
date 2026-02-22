export class HttpError extends Error {
	status: number;
	statusText: string;

	constructor(status: number, statusText: string) {
		super(`HTTP Error ${status}: ${statusText}`);
		this.name = "HttpError";
		this.status = status;
		this.statusText = statusText;
	}
}
