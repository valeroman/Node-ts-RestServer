"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userPatch = exports.userPut = exports.userPost = exports.usersGet = void 0;
exports.usersGet = (req, res) => {
    const { apiKey, limit = 1 } = req.query;
    res.json({
        msg: 'get API - controller',
        apiKey,
        limit
    });
};
exports.userPost = (req, res) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'post API - controller',
        nombre,
        edad
    });
};
exports.userPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'put API - controller',
        id
    });
};
exports.userPatch = (req, res) => {
    res.json({
        msg: 'patch API - controller'
    });
};
exports.userDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    });
};
//# sourceMappingURL=users.js.map