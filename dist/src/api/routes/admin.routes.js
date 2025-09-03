"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admin_controller_1 = require("../controllers/admin.controller");
var auth_middleware_1 = require("../middleware/auth.middleware");
var router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */
/**
 * @swagger
 * /api/admin/make-admin/{id}:
 *   put:
 *     summary: Make a user an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: User is now an admin
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.put('/make-admin/:id', (0, auth_middleware_1.auth)(['Admin']), admin_controller_1.makeAdmin);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map