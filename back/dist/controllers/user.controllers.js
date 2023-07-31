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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.nuevoUsuario = void 0;
const cliente_1 = require("../models/cliente");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Agregación de un nuevo usuario a la tabla 'cliente'.
const nuevoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Se obtienen los datos que se agregarán a la tabla 'cliente'.
    const { nombre, apellido, password } = req.body;
    /*
        1.- Por seguridad, antes de ingresar los datos, se encriptará la
            contraseña, por seguridad de los datos.

        2.- Dos contraseñas idénticas generan distinto hash
    */
    const pass_hash = yield bcrypt_1.default.hash(password, 10);
    /*
        En el caso de que se necesite revisar si existe valor duplicados,
        para cualidades que tiene la restricción de 'unique' se puede
        utilizar la siguiente función de 'sequelize'.

        const respuesta = await Cliente.findOne({ where: { variable_unica: valor})
    */
    console.log('Luego de aplicar el hash, la pass es: ' + pass_hash);
    const verificacion = yield cliente_1.Cliente.findOne({ where: { nombre: nombre, apellido: apellido } });
    if (verificacion) {
        return res.status(400).json('El usuario ingresado ya existe');
    }
    try {
        // Buscando como hacer un insert
        const consulta = yield cliente_1.Cliente.create({
            nombre: nombre,
            apellido: apellido,
            password: pass_hash
        });
        res.status(200).json(consulta);
    }
    catch (error) {
        console.log('Fijese que no se puede agregar el usuario por: ' + error);
        res.status(500).json(error);
    }
});
exports.nuevoUsuario = nuevoUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, password } = req.body;
    console.log('Utilizaré: ' + nombre);
    const usuario = yield cliente_1.Cliente.findOne({ where: { nombre: nombre } });
    console.log('Se obtuvo: ' + usuario);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe tal usuario en nuestro registro.'
        });
    }
    /*
        1.- Notese que si el código llegó aquí es porque hay un usuario válido.
        2.- La siguiente asignación es una comparación de si coincide la contraseña
            ingresada y guarda relación con el usuario.
        3.- El valor de retorno es un boolean.
    */
    // 
    const coincidencia = yield bcrypt_1.default.compare(password, usuario.password);
    console.log('La contraseña coincide');
    // Si no hay coincidencia, entra aquí para forzar un mensaje de retorno para 
    // mantener una mejor interacción con el servidor.
    if (!coincidencia) {
        return res.status(404).json('Not found any coincidence');
    }
    // Se genera token.
    const token = jsonwebtoken_1.default.sign({
        nombre: nombre,
        password: password
    }, process.env.SECRET_KEY || 'Dinocompletos', 
    // Recordar que esto se baja el token luego de esta cantidad de tiempo (en ms).
    {
        expiresIn: 100000
    });
    // Respuesta final.
    return res.status(200).json(token);
});
exports.login = login;
