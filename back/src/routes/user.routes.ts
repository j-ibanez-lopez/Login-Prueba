import { Router } from "express";
import { login, nuevoUsuario } from "../controllers/user.controllers";

const router = Router();
// Recordar que se debe empezar con '/'
router.post('/', nuevoUsuario)
router.post('/login/', login)

export default router;