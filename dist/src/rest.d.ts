import { DiscordRestOptions } from './types';
import { RestSendOptions } from './types';
export declare class DiscordRestError {
    private readonly _code;
    private readonly _message;
    private readonly _data;
    constructor(code: number, message: string, data: any);
    get code(): number;
    get message(): string;
    get error(): any;
}
export declare class DiscordRestResponse {
    private readonly _status;
    private readonly _body;
    private readonly _json;
    constructor(text: any, status: any, client: any);
    status(): Promise<number>;
    body(): Promise<any>;
    text(): Promise<any>;
    json(): Promise<any>;
}
export declare enum RequestMethod {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE"
}
export declare class DiscordRest {
    private readonly _token;
    private readonly _version;
    private readonly _tokenType;
    private _client;
    constructor(options: DiscordRestOptions);
    get token(): string;
    get version(): number;
    get tokenType(): string;
    private _request;
    get(options: RestSendOptions): Promise<any>;
    post(options: RestSendOptions): Promise<any>;
    put(options: RestSendOptions): Promise<any>;
    patch(options: RestSendOptions): Promise<any>;
    delete(options: RestSendOptions): Promise<any>;
}
