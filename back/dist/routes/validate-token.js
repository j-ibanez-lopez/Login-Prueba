"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarToken = (req, res, next) => {
    console.log('Usted está en la validación de token');
    const headerToken = req.headers['authorization'];
    console.log('Token recibido: ', headerToken);
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const token = headerToken.slice(7);
            jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'llave_default');
            next();
        }
        catch (error) {
            console.log('Se ha producido el siguiente error: ' + error);
            return res.status(401).json('No se ha logrado la conexión con el token');
        }
    }
    else {
        res.status(401).json({
            message: 'access denied'
        });
    }
    // if (headerToken != undefined && headerToken.startsWith('Bearer ')) 
    // {
    //     jwt.verify(headerToken, process.env.SECRET_KEY || 'llave_default')
    //     next()
    // } 
};
exports.default = validarToken;
