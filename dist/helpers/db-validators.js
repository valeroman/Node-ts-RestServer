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
exports.isValidProductById = exports.isValidCategoryById = exports.isValidUserById = exports.isValidEmail = exports.isValidRole = void 0;
const models_1 = require("../models");
exports.isValidRole = (role = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existRole = yield models_1.Role.findOne({ role });
    if (!existRole) {
        throw new Error(`The role ${role}, is not registered in the DB`);
    }
});
exports.isValidEmail = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeEmail = yield models_1.User.findOne({ email });
    if (existeEmail) {
        throw new Error(`The email: ${email}, is already registered`);
    }
});
exports.isValidUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existeUser = yield models_1.User.findById(id);
    if (!existeUser) {
        throw new Error(`The ID: ${id}, not exist`);
    }
});
exports.isValidCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existCategory = yield models_1.Category.findById(id);
    if (!existCategory) {
        throw new Error(`The ID: ${id}, not exist`);
    }
});
exports.isValidProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existProduct = yield models_1.Product.findById(id);
    if (!existProduct) {
        throw new Error(`The ID: ${id}, not exist`);
    }
});
//# sourceMappingURL=db-validators.js.map