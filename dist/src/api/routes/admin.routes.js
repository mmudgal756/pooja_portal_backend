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
 * /api/admin/users/{id}/role:
 *   put:
 *     summary: Update a user's role
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [Admin, Vendor, Customer]
 *             required:
 *               - role
 *     responses:
 *       200:
 *         description: User role updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/users/:id/role', (0, auth_middleware_1.auth)(['Admin']), admin_controller_1.updateUserRole);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map