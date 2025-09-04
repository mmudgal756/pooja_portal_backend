"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var auth = function (roles) {
    return function (req, res, next) {
        var _a;
        // Bypassing authentication for now.
        req.user = { id: '60d21b4667d0d8992e610c85', role: 'Vendor' }; // Mock user
        next();
        return;
        var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        try {
            var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
            req.user = decoded;
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ msg: 'Forbidden' });
            }
            next();
        }
        catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    };
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map