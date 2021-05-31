"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tieneRole = exports.isAdminRole = void 0;
exports.isAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            msg: 'You want to verify the role without validating the token first'
        });
    }
    const { name, role } = req.user;
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} not an administrator - can't do this`
        });
    }
    next();
};
exports.tieneRole = ([...roles]) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                msg: 'You want to verify the role without validating the token first'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service requires one of these roles ${roles}`
            });
        }
        next();
    };
};
//# sourceMappingURL=valid-role.js.map