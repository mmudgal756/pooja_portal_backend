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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.getAllUsers = exports.getUserById = exports.getMe = exports.login = exports.register = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_model_1 = require("../../models/user.model");
var generateTokens = function (user) {
    var accessToken = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '15m' });
    var refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET || 'your_jwt_refresh_secret', { expiresIn: '7d' });
    return { accessToken: accessToken, refreshToken: refreshToken };
};
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, name, email, password, user, tokens, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (user) {
                    return [2 /*return*/, res.status(400).json({ msg: 'User already exists' })];
                }
                user = new user_model_1.User({ name: name, email: email, password: password });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                tokens = generateTokens(user);
                res.status(201).json(tokens);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error(err_1.message);
                res.status(500).send('Server error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, email, password, user, isMatch, tokens, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.User.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Invalid credentials' })];
                }
                return [4 /*yield*/, user.comparePassword(password)];
            case 3:
                isMatch = _b.sent();
                if (!isMatch) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Invalid credentials' })];
                }
                tokens = generateTokens(user);
                res.json(tokens);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.error(err_2.message);
                res.status(500).send('Server error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.findById(req.user.id).select('-password')];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ msg: 'User not found' })];
                }
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                console.error(err_3.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMe = getMe;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.findById(req.params.id).select('-password')];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ msg: 'User not found' })];
                }
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                console.error(err_4.message);
                if (err_4.kind === 'ObjectId') {
                    return [2 /*return*/, res.status(404).json({ msg: 'User not found' })];
                }
                res.status(500).send('Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.find().select('-password')];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                console.error(err_5.message);
                res.status(500).send('Server error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var updateUserRole = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var role, id, allowedRoles, user, userResponse, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                role = req.body.role;
                id = req.params.id;
                if (!role) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Role is required' })];
                }
                allowedRoles = ['Admin', 'Vendor', 'Customer'];
                if (!allowedRoles.includes(role)) {
                    return [2 /*return*/, res.status(400).json({ msg: 'Invalid role specified' })];
                }
                return [4 /*yield*/, user_model_1.User.findByIdAndUpdate(id, { role: role }, { new: true })];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ msg: 'User not found' })];
                }
                userResponse = user.toObject();
                delete userResponse.password;
                res.json({ msg: 'User role updated successfully', user: userResponse });
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.status(500).json({ msg: err_6.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserRole = updateUserRole;
//# sourceMappingURL=user.controller.js.map