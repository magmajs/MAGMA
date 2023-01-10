import { fetch } from 'undici';
import { DiscordRestOptions } from './types';
import { RestSendOptions } from './types';

export class DiscordRestError {
    private readonly _code: number;
    private readonly _message: string;
    private readonly _data: any;

    constructor(code: number, message: string, data: any) {
        this._code = code;
        this._message = message;
        this._data = data;
    }

    public get code(): number {
        return this._code;
    }

    public get message(): string {
        return this._message;
    }

    public get error(): any {
        return this._data;
    }
}

export class DiscordRestResponse {
    private readonly _status: number;
    private readonly _body: any;
    private readonly _json: any;

    constructor(text: any, status: any, client: any) {
        this._body = text;
        this._status = status;
        this._json = JSON.parse(text);

        if (this._status >= 400) {
            client.emit('error', new DiscordRestError(this._status, this._json.message, this._json.errors));
        } else {
            client.emit('debug', `Response: ${this._status} ${this._json.message}`);
        }
    }

    public async status(): Promise<number> {
        return this._status;
    }

    public async body(): Promise<any> {
        return JSON.parse(await this._body);
    }

    public async text(): Promise<any> {
        return await this._body;
    }

    public async json(): Promise<any> {
        return await this._json;
    }
}

export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
}

export class DiscordRest {
    private readonly _token: string;
    private readonly _version: number;
    private readonly _tokenType: string;
    private _client: any;

    constructor(options: DiscordRestOptions) {
        this._token = options.token;
        this._version = options.version;
        this._tokenType = options.tokenType;
        this._client = options.client;
    }

    public get token(): string {
        return this._token;
    }

    public get version(): number {
        return this._version;
    }

    public get tokenType(): string {
        return this._tokenType;
    }

    private async _request(endpoint: string, method: RequestMethod, headers: any, body: any = null): Promise<any> {
        headers['Authorization'] = `${this._tokenType} ${this._token}`;
        headers['Content-Type'] = 'application/json' || headers['Content-Type'];

        body = body ? JSON.stringify(body) : null; 

        const response = await fetch(`https://discord.com/api/v${this._version}/${endpoint}`, {
            method: method,
            headers: headers,
            body: body
        });

        return new DiscordRestResponse(await response.text(), response.status, this._client);
    }

    public async get(options: RestSendOptions): Promise<any> {
        return await this._request(options.path, RequestMethod.Get, options.headers || {}, options.body);
    }

    public async post(options: RestSendOptions): Promise<any> {
        return await this._request(options.path, RequestMethod.Post, options.headers || {}, options.body);
    }

    public async put(options: RestSendOptions): Promise<any> {
        return await this._request(options.path, RequestMethod.Put, options.headers || {}, options.body);
    }

    public async patch(options: RestSendOptions): Promise<any> {
        return await this._request(options.path, RequestMethod.Patch, options.headers || {}, options.body);
    }

    public async delete(options: RestSendOptions): Promise<any> {
        return await this._request(options.path, RequestMethod.Delete, options.headers || {}, options.body);
    }
}