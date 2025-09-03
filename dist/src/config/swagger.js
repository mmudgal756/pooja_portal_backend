"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: 'API for an e-commerce platform'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        description: {
                            type: 'string'
                        },
                        price: {
                            type: 'number'
                        },
                        category: {
                            type: 'string'
                        },
                        stock: {
                            type: 'number'
                        }
                    }
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/api/routes/*.ts']
};
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
//# sourceMappingURL=swagger.js.map