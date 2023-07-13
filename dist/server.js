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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("colorts/lib/string");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
let server;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.database_url);
        console.log('Database connected successfully.'.green);
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Application listening on ${config_1.default.port}`.yellow);
        });
    }
    catch (err) {
        console.log('Failed to connect.', err);
    }
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
});
connectToDatabase();
process.on('SIGALRM', () => {
    console.log('SIGALRM is received');
    if (server) {
        server.close();
    }
});
