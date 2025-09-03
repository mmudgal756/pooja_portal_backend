"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var helmet_1 = __importDefault(require("helmet"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var category_routes_1 = __importDefault(require("./src/api/routes/category.routes"));
var product_routes_1 = __importDefault(require("./src/api/routes/product.routes"));
var user_routes_1 = __importDefault(require("./src/api/routes/user.routes"));
var swagger_1 = __importDefault(require("./src/config/swagger"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use('/api/users', user_routes_1.default);
app.use('/api/categories', category_routes_1.default);
app.use('/api/products', product_routes_1.default);
var PORT = process.env.PORT || 3000;
var MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("MONGO_URI is not defined in the environment variables.");
    process.exit(1);
}
mongoose_1.default.connect(MONGO_URI)
    .then(function () {
    app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
})
    .catch(function (err) { return console.error(err); });
//# sourceMappingURL=index.js.map