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
exports.Heartbeater = void 0;
const events_1 = require("events");
class Heartbeater extends events_1.EventEmitter {
    constructor(gateway, heartbeatInterval) {
        super();
        this.Gateway = gateway;
        this.heartbeatInterval = heartbeatInterval;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._interval = setInterval(() => {
                this.Gateway.send({ op: 1, d: null });
                this.Gateway.client.emit("debug", `Heartbeat sent to shard ${this.Gateway.shardID}`);
            }, this.heartbeatInterval);
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            clearInterval(this._interval);
        });
    }
}
exports.Heartbeater = Heartbeater;
