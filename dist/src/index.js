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
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
// import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './config/swagger';
var user_routes_1 = __importDefault(require("./api/routes/user.routes"));
var category_routes_1 = __importDefault(require("./api/routes/category.routes"));
var product_routes_1 = __importDefault(require("./api/routes/product.routes"));
var admin_routes_1 = __importDefault(require("./api/routes/admin.routes"));
var user_model_1 = require("./models/user.model");
dotenv_1.default.config();
var app = (0, express_1.default)();
// A custom middleware to handle CORS
app.use(function (req, res, next) {
    // Set the origin to allow your React app
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    // Set the allowed HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    // Set the allowed headers, including Content-Type and Authorization
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Handle the preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/users', user_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.use('/api/products', product_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
var port = parseInt(process.env.PORT || '3000');
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var connectionRetries, err_1, admin, newAdmin, vendor, newVendor;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connectionRetries = 5;
                _a.label = 1;
            case 1:
                if (!(connectionRetries > 0)) return [3 /*break*/, 7];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 6]);
                return [4 /*yield*/, mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test')];
            case 3:
                _a.sent();
                console.log('Connected to MongoDB');
                return [3 /*break*/, 7]; // If connection is successful, break the loop
            case 4:
                err_1 = _a.sent();
                console.error('MongoDB connection failed. Retrying...');
                connectionRetries--;
                if (connectionRetries === 0) {
                    console.error('Could not connect to MongoDB after multiple retries. Exiting.');
                    process.exit(1); // Exit if all retries fail
                }
                return [4 /*yield*/, sleep(5000)];
            case 5:
                _a.sent(); // Wait for 5 seconds before retrying
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 1];
            case 7: return [4 /*yield*/, user_model_1.User.findOne({ role: 'Admin' })];
            case 8:
                admin = _a.sent();
                if (!!admin) return [3 /*break*/, 10];
                newAdmin = new user_model_1.User({
                    name: 'Admin',
                    email: 'admin@example.com',
                    password: 'admin123',
                    role: 'Admin'
                });
                return [4 /*yield*/, newAdmin.save()];
            case 9:
                _a.sent();
                console.log('Default admin user created');
                _a.label = 10;
            case 10: return [4 /*yield*/, user_model_1.User.findOne({ role: 'Vendor' })];
            case 11:
                vendor = _a.sent();
                if (!!vendor) return [3 /*break*/, 13];
                newVendor = new user_model_1.User({
                    name: 'Vendor',
                    email: 'vendor@example.com',
                    password: 'vendor123',
                    role: 'Vendor'
                });
                return [4 /*yield*/, newVendor.save()];
            case 12:
                _a.sent();
                console.log('Default vendor user created');
                _a.label = 13;
            case 13:
                app.listen(port, function () {
                    console.log("listening on port ".concat(port));
                });
                return [2 /*return*/];
        }
    });
}); };
start();
//# sourceMappingURL=index.js.map