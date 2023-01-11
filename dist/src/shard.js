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
exports.DiscordShard = void 0;
const gateway_1 = require("./gateway");
class DiscordShard {
    constructor(client, shardID, url, token, intents) {
        this.client = client;
        this.shardID = shardID;
        this._token = token;
        this.gateway = new gateway_1.DiscordGateway(url, shardID, client, this, token, intents);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.gateway.connect();
        });
    }
}
exports.DiscordShard = DiscordShard;
