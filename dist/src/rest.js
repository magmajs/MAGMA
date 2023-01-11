"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordRest = exports.RequestMethod = exports.DiscordRestResponse = exports.DiscordRestError = void 0;
const undici_1 = require("undici");
class DiscordRestError {
    constructor(code, message, data) {
        this._code = code;
        this._message = message;
        this._data = data;
    }
    get code() {
        return this._code;
    }
    get message() {
        return this._message;
    }
    get error() {
        return this._data;
    }
}
exports.DiscordRestError = DiscordRestError;
class DiscordRestResponse {
    constructor(text, status, client) {
        this._body = text;
        this._status = status;
        this._json = JSON.parse(text);
        if (this._status >= 400) {
            client.emit('error', new DiscordRestError(this._status, this._json.message, this._json.errors));
        }
        else {
            client.emit('debug', `Response: ${this._status} ${this._json.message}`);
        }
    }
    status() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._status;
        });
    }
    body() {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(yield this._body);
        });
    }
    text() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._body;
        });
    }
    json() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._json;
        });
    }
}
exports.DiscordRestResponse = DiscordRestResponse;
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["Get"] = "GET";
    RequestMethod["Post"] = "POST";
    RequestMethod["Put"] = "PUT";
    RequestMethod["Patch"] = "PATCH";
    RequestMethod["Delete"] = "DELETE";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
class DiscordRest {
    constructor(options) {
        this._token = options.token;
        this._version = options.version;
        this._tokenType = options.tokenType;
        this._client = options.client;
    }
    get token() {
        return this._token;
    }
    get version() {
        return this._version;
    }
    get tokenType() {
        return this._tokenType;
    }
    _request(endpoint, method, headers, body = null) {
        return __awaiter(this, void 0, void 0, function* () {
            headers['Authorization'] = `${this._tokenType} ${this._token}`;
            headers['Content-Type'] = 'application/json' || headers['Content-Type'];
            body = body ? JSON.stringify(body) : null;
            const response = yield (0, undici_1.fetch)(`https://discord.com/api/v${this._version}/${endpoint}`, {
                method: method,
                headers: headers,
                body: body
            });
            return new DiscordRestResponse(yield response.text(), response.status, this._client);
        });
    }
    get(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._request(options.path, RequestMethod.Get, options.headers || {}, options.body);
        });
    }
    post(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._request(options.path, RequestMethod.Post, options.headers || {}, options.body);
        });
    }
    put(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._request(options.path, RequestMethod.Put, options.headers || {}, options.body);
        });
    }
    patch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._request(options.path, RequestMethod.Patch, options.headers || {}, options.body);
        });
    }
    delete(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._request(options.path, RequestMethod.Delete, options.headers || {}, options.body);
        });
    }
}
exports.DiscordRest = DiscordRest;
