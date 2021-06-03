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
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const collectionAllowed = [
    'users',
    'categories',
    'products'
];
const searchUsers = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMongoId = mongoose_1.default.isValidObjectId(termino);
        if (isMongoId) {
            const user = yield models_1.User.findById(termino);
            return res.json({
                results: (user) ? [user] : []
            });
        }
        const regex = new RegExp(termino, 'i');
        const query = { $or: [{ name: regex }, { email: regex }], $and: [{ status: true }] };
        const [total, users] = yield Promise.all([
            models_1.User.countDocuments(query),
            models_1.User.find(query)
        ]);
        res.json({
            results: {
                total,
                users
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
const searchCategories = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMongoId = mongoose_1.default.isValidObjectId(termino);
        if (isMongoId) {
            const category = yield models_1.Category.findById(termino);
            return res.json({
                results: (category) ? [category] : []
            });
        }
        const regex = new RegExp(termino, 'i');
        const query = { $or: [{ name: regex }], $and: [{ status: true }] };
        const [total, categories] = yield Promise.all([
            models_1.Category.countDocuments(query),
            models_1.Category.find(query)
        ]);
        res.json({
            results: {
                total,
                categories
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
const searchProducts = (termino = '', res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMongoId = mongoose_1.default.isValidObjectId(termino);
        if (isMongoId) {
            const product = yield models_1.Product.findById(termino);
            return res.json({
                results: (product) ? [product] : []
            });
        }
        const regex = new RegExp(termino, 'i');
        const query = { $or: [{ name: regex }, { description: regex }], $and: [{ status: true }] };
        const [total, products] = yield Promise.all([
            models_1.Product.countDocuments(query),
            models_1.Product.find(query)
        ]);
        res.json({
            results: {
                total,
                products
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
const search = (req, res) => {
    const { collection, termino } = req.params;
    if (!collectionAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${collectionAllowed}`
        });
    }
    switch (collection) {
        case 'users':
            searchUsers(termino, res);
            break;
        case 'categories':
            searchCategories(termino, res);
            break;
        case 'products':
            searchProducts(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer la busqueda'
            });
    }
};
exports.default = search;
//# sourceMappingURL=search.js.map