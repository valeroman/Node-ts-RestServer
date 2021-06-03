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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const models_1 = require("../models");
exports.getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };
    try {
        const [total, products] = yield Promise.all([
            models_1.Product.countDocuments(query),
            models_1.Product.find(query)
                .populate('user', 'name')
                .populate('category', 'name')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        res.json({
            total,
            products
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador.'
        });
    }
});
exports.getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield models_1.Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name');
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { status, user } = _a, body = __rest(_a, ["status", "user"]);
    try {
        const productDB = yield models_1.Product.findOne({ name: body.name });
        if (productDB) {
            return res.status(400).json({
                msg: `Product ${productDB.name}, already exists`
            });
        }
        const data = Object.assign(Object.assign({}, body), { name: body.name.toUpperCase(), user: req.user._id });
        const product = new models_1.Product(data);
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const _b = req.body, { status, user } = _b, data = __rest(_b, ["status", "user"]);
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;
    try {
        const product = yield models_1.Product.findByIdAndUpdate(id, data, { new: true });
        res.json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield models_1.Product.findByIdAndUpdate(id, { status: false }, { new: true });
        res.json(product);
    }
    catch (error) {
    }
});
//# sourceMappingURL=product.js.map