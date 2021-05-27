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
exports.isValidUserById = exports.isValidEmail = exports.isValidRole = void 0;
const user_1 = __importDefault(require("../models/user"));
const role_1 = __importDefault(require("../models/role"));
exports.isValidRole = (role = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existRole = yield role_1.default.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${role}, is not registered in the DB`);
    }
});
exports.isValidEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield user_1.default.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email: ${email}, is already registered`);
    }
});
exports.isValidUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUser = yield user_1.default.findById(id);
    if (!existeUser) {
        throw new Error(`The ID: ${id}, not exist`);
    }
});
//# sourceMappingURL=db-validators.js.map