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
exports.dbConnection = void 0;
// import dotenv from 'dotenv';
const mongoose_1 = require("mongoose");
// dotenv.config();
exports.dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.connect(`${process.env.MONGODB_CNN}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Base de datos online');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }
});
//# sourceMappingURL=config.js.map