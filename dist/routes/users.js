"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = express_1.Router();
router.get('/', users_1.usersGet);
router.post('/', users_1.userPost);
router.put('/:id', users_1.userPut);
router.patch('/', users_1.userPatch);
router.delete('/', users_1.userDelete);
exports.default = router;
//# sourceMappingURL=users.js.map