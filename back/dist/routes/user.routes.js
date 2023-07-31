"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const router = (0, express_1.Router)();
// Recordar que se debe empezar con '/'
router.post('/', user_controllers_1.nuevoUsuario);
router.post('/login/', user_controllers_1.login);
exports.default = router;
